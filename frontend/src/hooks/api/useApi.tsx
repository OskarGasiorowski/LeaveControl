import ky from 'ky';
import { createAccount, CreateAccountRequest, login, LoginRequest } from './auth';
import { createTenant, CreateTenantRequest } from './tenant';
import { useAuth } from '#modules/auth';
import { useMemo } from 'react';

export function useApi() {
    const { token } = useAuth();
    const api = ky.create({ prefixUrl: 'http://localhost:5255' });
    const authenticatedApi = useMemo(
        () =>
            ky.create({
                prefixUrl: 'http://localhost:5255',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        [token],
    );

    return {
        createAccount: (body: CreateAccountRequest) => createAccount(api, body),
        login: (body: LoginRequest) => login(api, body),
        setupAccount: (body: CreateTenantRequest) => createTenant(authenticatedApi, body),
    };
}
