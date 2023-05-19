import {
    CreateAccountRequest,
    CreateAccountResponse,
    InternalServerError,
    useApi,
    UserWithGivenEmailExistsError,
} from '../api';
import { useAuth } from '#modules/auth';
import { noop } from 'lodash';
import { useMutation } from '@tanstack/react-query';
import { useError } from './useError';

type AppError = InternalServerError | UserWithGivenEmailExistsError;

export function useCreateAccount(onSuccess: () => void = noop) {
    const { createAccount } = useApi();
    const { setToken } = useAuth();

    const { mutate, isLoading, error } = useMutation<
        CreateAccountResponse,
        AppError,
        CreateAccountRequest
    >(['create-account'], createAccount, {
        onSuccess: (data) => {
            setToken(data.token);
            onSuccess();
        },
    });

    const errorToDisplay = useError<AppError>(error, 'UserWithGivenEmailExists');

    return {
        createAccount: mutate,
        isLoading,
        error: errorToDisplay,
    };
}
