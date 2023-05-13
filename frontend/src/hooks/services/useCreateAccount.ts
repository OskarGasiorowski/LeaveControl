import { useMutation } from 'react-query';
import { useApi } from '../api';
import { useAuth } from '#modules/auth';
import { noop } from 'lodash';

export function useCreateAccount(onSuccess: () => void = noop) {
    const { createAccount } = useApi();
    const { setToken } = useAuth();

    const { mutate, isLoading } = useMutation('create-account', createAccount, {
        onSuccess: (data) => {
            setToken(data.token);
            onSuccess();
        },
    });

    return {
        createAccount: mutate,
        isLoading,
    };
}
