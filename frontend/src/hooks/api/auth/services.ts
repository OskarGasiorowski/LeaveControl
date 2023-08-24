import {
    ChangePasswordRequest,
    CreateAccountRequest,
    CreateAccountResponse,
    LoginRequest,
    LoginResponse,
} from './types';
import ky, { HTTPError } from 'ky';

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
        .json<LoginResponse>()
        .catch(async (httpError: HTTPError) => {
            const error = await httpError.response.json();
            throw error;
        });
}

export function changePassword(api: typeof ky, body: ChangePasswordRequest) {
    return api.post('auth/me/change-password', { json: body }).json<string>();
}
