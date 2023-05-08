import { useMutation } from 'react-query';
import { useApi } from '../api';

export function useCreateAccount() {
    const { createAccount } = useApi();

    const { mutate } = useMutation('create-account', createAccount);

    return {
        createAccount: mutate,
    };
}
