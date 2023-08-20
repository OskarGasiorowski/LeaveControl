import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useApi } from '../api';
import { useToast } from '../useToast.ts';

export function useAddUser(onSuccess?: () => void) {
    const { addUser } = useApi();
    const queryClient = useQueryClient();
    const { successToast } = useToast();

    function handleOnSuccess() {
        successToast('User create successfully');
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
