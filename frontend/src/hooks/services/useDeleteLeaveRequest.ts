import { useApi } from '../api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteLeaveRequest(userId: string, onSuccess?: () => void) {
    const { deleteLeave } = useApi();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: deleteLeave,
        onSuccess: () => {
            onSuccess?.();
            return queryClient.invalidateQueries({ queryKey: ['calendar', userId] });
        },
    });

    return {
        deleteLeave: mutate,
        isPending,
    };
}
