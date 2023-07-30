import { useApi } from '../api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useLeaveRequest(userId: string, onSuccess?: () => void) {
    const { postLeaveRequest } = useApi();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: postLeaveRequest,
        onSuccess: () => {
            onSuccess?.();
            return queryClient.invalidateQueries({ queryKey: ['calendar', userId] });
        },
    });

    return {
        request: mutate,
        isPending,
    };
}
