export interface CreateTenantRequest {
    defaultAllowance: number;
    acceptanceRequired: boolean;
    allowanceOverflowAllowed: boolean;
    adminFirstName: string;
    adminSurname: string;
}

export interface AddUserRequest {
    firstName: string;
    surname: string;
    email: string;
}
