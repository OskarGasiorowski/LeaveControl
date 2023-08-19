import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useApi } from '../api';

export function useApprovePendingRequest(userId: string, leaveId: string) {
    const { approvePendingRequests } = useApi();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: () => approvePendingRequests(userId, leaveId),
        onSuccess: () => {
            return queryClient.invalidateQueries({ queryKey: ['pending-requests'] });
        },
    });

    return {
        approve: mutate,
        isApprovePending: isPending,
    };
}
