import { InternalServerError, useApi } from '../api';
import { useMutation } from '@tanstack/react-query';
import { CreateTenantRequest } from '../api/tenant';
import { useError } from './useError';
import { useAuth } from '#modules/auth';
import { usePaths } from '../usePaths';
import { useNavigate } from 'react-router';

export function useSetupAccount() {
    const paths = usePaths();
    const navigate = useNavigate();
    const { setToken } = useAuth();
    const { setupAccount } = useApi();

    const { isLoading, mutate, error } = useMutation<
        string,
        InternalServerError,
        CreateTenantRequest
    >(['useSetupAccount'], setupAccount, {
        onSuccess: (token) => {
            setToken(token);
            navigate(paths.dashboard, { replace: true });
        },
    });

    useError(error);

    return {
        setupAccount: mutate,
        isLoading,
    };
}
