import {
    useApi,
    type InternalServerError,
    InvalidCredentialsError,
    LoginRequest,
    LoginResponse,
} from '../api';
import { useAuth } from '#modules/auth';
import { useMutation } from '@tanstack/react-query';
import { useError } from './useError';

type AppError = InternalServerError | InvalidCredentialsError;

export function useLogin(onSuccess?: () => void) {
    const { login } = useApi();
    const { setToken } = useAuth();

    const { mutate, isLoading, error } = useMutation<LoginResponse, AppError, LoginRequest>(
        ['login'],
        login,
        {
            onSuccess: (data) => {
                onSuccess?.();
                setToken(data.token);
            },
        },
    );

    const errorToDisplay = useError<AppError>(error, 'InvalidCredentials');

    return {
        login: mutate,
        isLoading,
        error: errorToDisplay,
    };
}
