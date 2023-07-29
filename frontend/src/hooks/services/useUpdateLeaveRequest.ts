import { UpdateLeaveRequest, useApi } from '../api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateLeaveRequest(
    userId: string,
    leaveId: string | null,
    onSuccess?: () => void,
) {
    const { updateLeave } = useApi();
    const { invalidateQueries } = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationKey: ['leave-request'],
        mutationFn: (body: UpdateLeaveRequest) =>
            leaveId ? updateLeave(leaveId, body) : Promise.resolve(),
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
