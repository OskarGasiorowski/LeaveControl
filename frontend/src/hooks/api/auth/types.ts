import { ErrorType } from '../types';

export interface CreateAccountRequest {
    adminEmail: string;
    adminPassword: string;
}

export interface CreateAccountResponse {
    token: string;
    userId: string;
    tenantId: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    userId: string;
    tenantId: string;
}

export type InvalidCredentialsError = {
    code: 'InvalidCredentials';
    codeNumber: 6;
    type: ErrorType.User;
    message: string;
};

export type UserWithGivenEmailExistsError = {
    code: 'UserWithGivenEmailExists';
    codeNumber: 1;
    type: ErrorType.Conflict;
    message: string;
};

export interface ChangePasswordRequest {
    password: string;
}
