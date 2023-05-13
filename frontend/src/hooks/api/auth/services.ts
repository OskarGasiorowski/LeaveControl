import { CreateAccountRequest, CreateAccountResponse, LoginRequest, LoginResponse } from './types';
import ky from 'ky';

export function createAccount(
    api: typeof ky,
    body: CreateAccountRequest,
): Promise<CreateAccountResponse> {
    return api
        .post('auth/register', {
            json: body,
        })
        .json<CreateAccountResponse>();
}

export function login(api: typeof ky, body: LoginRequest) {
    return api
        .post('auth', {
            json: body,
        })
        .json<LoginResponse>();
}
