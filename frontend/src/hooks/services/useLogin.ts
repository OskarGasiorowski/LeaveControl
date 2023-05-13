import { useApi } from '../api';
import { useAuth } from '#modules/auth';
import { useMutation } from 'react-query';

export function useLogin() {
    const { login } = useApi();
    const { setToken } = useAuth();

    const { mutate, isLoading } = useMutation('login', login, {
        onSuccess: (data) => {
            setToken(data.token);
        },
    });

    return {
        login: mutate,
        isLoading,
    };
}
