import { useMutation } from 'react-query';
import { useApi } from '../api';
import { useAuth } from '../useAuth';

export function useCreateAccount() {
    const { createAccount } = useApi();
    const { setToken } = useAuth();

    const { mutate } = useMutation('create-account', createAccount, {
        onSuccess: (data) => setToken(data.token),
    });

    return {
        createAccount: mutate,
    };
}
