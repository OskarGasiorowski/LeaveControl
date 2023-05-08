import ky from 'ky';
import { createAccount, CreateAccountRequest } from './auth';

export function useApi() {
    const api = ky.create({ prefixUrl: 'http://localhost:5255' });

    return {
        createAccount: (body: CreateAccountRequest) => createAccount(api, body),
    };
}
