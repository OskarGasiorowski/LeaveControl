import {CreateAccountRequest, CreateAccountResponse} from "./types";
import ky from "ky";

export function createAccount(api: typeof ky, body: CreateAccountRequest): Promise<CreateAccountResponse> {
    return api.post('auth/register', {
        json: body,
    }).json<CreateAccountResponse>();
}