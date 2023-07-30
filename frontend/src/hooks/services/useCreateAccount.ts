import {
    CreateAccountRequest,
    CreateAccountResponse,
    InternalServerError,
    useApi,
    UserWithGivenEmailExistsError,
} from '../api';
import { useAuth } from '#modules/auth';
import { useMutation } from '@tanstack/react-query';
import { useError } from './useError';
import { usePaths } from '../usePaths';
import { useNavigate } from 'react-router';
import { decodeToken } from '#utils';

type AppError = InternalServerError | UserWithGivenEmailExistsError;

export function useCreateAccount() {
    const paths = usePaths();
    const navigate = useNavigate();
    const { createAccount } = useApi();
    const { setToken } = useAuth();

    const { mutate, isPending, error } = useMutation<
        CreateAccountResponse,
        AppError,
        CreateAccountRequest
    >({
        mutationKey: ['create-account'],
        mutationFn: createAccount,
        onSuccess: (data) => {
            setToken(data.token);
            decodeToken(data.token);

            navigate(paths.dashboard, { replace: true });
        },
    });

    const errorToDisplay = useError<AppError>(error, 'UserWithGivenEmailExists');

    return {
        createAccount: mutate,
        isLoading: isPending,
        error: errorToDisplay,
    };
}
