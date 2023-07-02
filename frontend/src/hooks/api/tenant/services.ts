import ky from 'ky';
import {AddUserRequest, CreateTenantRequest, GetUserResponse} from './types';

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

export function getUsers(api: typeof ky): Promise<GetUserResponse> {
    return api.get('tenant/current/users').json<GetUserResponse>();
}
