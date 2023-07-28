import { useApi } from '../api';
import { useMutation } from '@tanstack/react-query';

export function useLeaveRequest() {
    const { postLeaveRequest } = useApi();

    const { mutate, isPending } = useMutation({
        mutationKey: ['leave-request'],
        mutationFn: postLeaveRequest,
    });

    return {
        request: mutate,
        isPending,
    };
}
