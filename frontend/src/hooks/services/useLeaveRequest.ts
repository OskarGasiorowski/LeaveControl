import { useApi } from '../api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useLeaveRequest(userId: string, onSuccess?: () => void) {
    const { postLeaveRequest } = useApi();
    const { invalidateQueries } = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationKey: ['leave-request'],
        mutationFn: postLeaveRequest,
        onSuccess: async () => {
            await invalidateQueries({ queryKey: ['calendar', userId] });
            onSuccess?.();
        },
    });

    return {
        request: mutate,
        isPending,
    };
}
