import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useApi } from '../api';

export function useAddUser(onSuccess?: () => void) {
    const { addUser } = useApi();
    const { invalidateQueries } = useQueryClient();

    function handleOnSuccess() {
        invalidateQueries(['users']);
        onSuccess?.();
    }

    const { mutate, isLoading } = useMutation(['add-user'], addUser, {
        onSuccess: handleOnSuccess,
    });

    return {
        addUser: mutate,
        isLoading,
    };
}
