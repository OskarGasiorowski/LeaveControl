import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useApi } from '../api';

export function useAddUser(onSuccess?: () => void) {
    const { addUser } = useApi();
    const queryClient = useQueryClient();

    function handleOnSuccess() {
        onSuccess?.();
        return queryClient.invalidateQueries({ queryKey: ['users'] });
    }

    const { mutate, isPending } = useMutation({
        mutationKey: ['add-user'],
        mutationFn: addUser,
        onSuccess: handleOnSuccess,
    });

    return {
        addUser: mutate,
        isLoading: isPending,
    };
}
