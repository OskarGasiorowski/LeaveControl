import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useApi } from '../api';

export function useRejectPendingRequest(userId: string, leaveId: string) {
    const { declinePendingRequests } = useApi();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: () => declinePendingRequests(userId, leaveId),
        onSuccess: () => {
            return queryClient.invalidateQueries({ queryKey: ['pending-requests'] });
        },
    });

    return {
        reject: mutate,
        isRejectPending: isPending,
    };
}