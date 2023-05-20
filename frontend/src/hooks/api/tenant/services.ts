import ky from 'ky';

export function createTenant(api: typeof ky, body: CreateTenantRequest): Promise<string> {
    return api
        .post('tenant', {
            json: body,
        })
        .text();
}
