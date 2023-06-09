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
import { usePaths } from '../usePaths';
import { useLocation, useNavigate } from 'react-router';
import { decodeToken } from '#utils';

type AppError = InternalServerError | InvalidCredentialsError;

export function useLogin() {
    const paths = usePaths();
    const navigate = useNavigate();
    const location = useLocation();

    const { login } = useApi();
    const { setToken } = useAuth();

    const { mutate, isLoading, error } = useMutation<LoginResponse, AppError, LoginRequest>(
        ['login'],
        login,
        {
            onSuccess: (data) => {
                setToken(data.token);
                const { role } = decodeToken(data.token);

                if (role === 'IncompleteAdmin') {
                    navigate(paths.setupAccount, { replace: true });
                    return;
                }

                if (role === 'InvitedUser') {
                    // TODO
                    return;
                }

                const redirectTo = location.state?.from?.pathname || paths.dashboard;
                navigate(redirectTo, { replace: true });
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
