export interface CreateTenantRequest {
    defaultAllowance: number;
    acceptanceRequired: boolean;
    allowanceOverflowAllowed: boolean;
    adminFirstName: string;
    adminSurname: string;
}
