import ky from 'ky';
import { AddUserRequest, CreateTenantRequest } from './types';

export function createTenant(api: typeof ky, body: CreateTenantRequest): Promise<string> {
    return api
        .post('tenant', {
            json: body,
        })
        .text();
}

export function addUser(api: typeof ky, body: AddUserRequest): Promise<{ userId: string }> {
    return api
        .post('tenant/current/users', {
            json: body,
        })
        .json<{ userId: string }>();
}
