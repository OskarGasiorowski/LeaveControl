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

    const { mutate, isPending, error } = useMutation<LoginResponse, AppError, LoginRequest>({
        mutationKey: ['login'],
        mutationFn: login,
        onSuccess: (data) => {
            setToken(data.token);
            const { role } = decodeToken(data.token);

            if (role === 'IncompleteAdmin') {
                navigate(paths.setupWorkspace, { replace: true });
                return;
            }

            if (role === 'InvitedUser') {
                navigate(paths.setupInvitedUser);
                return;
            }

            const redirectTo = location.state?.from?.pathname || paths.dashboard;
            navigate(redirectTo, { replace: true });
        },
    });

    const errorToDisplay = useError<AppError>(error, 'InvalidCredentials');

    return {
        login: mutate,
        isLoading: isPending,
        error: errorToDisplay,
    };
}
