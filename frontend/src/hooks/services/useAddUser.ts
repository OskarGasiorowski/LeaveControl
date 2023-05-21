import { useMutation } from '@tanstack/react-query';
import { useApi } from '../api';

export function useAddUser() {
    const { addUser } = useApi();

    const { mutate, isLoading } = useMutation(['add-user'], addUser);

    return {
        addUser: mutate,
        isLoading,
    };
}
