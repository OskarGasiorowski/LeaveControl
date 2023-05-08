export interface CreateAccountRequest {
    adminEmail: string;
    adminPassword: string;
}

export interface CreateAccountResponse {
    token: string;
    userId: string;
    tenantId: string;
}