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
