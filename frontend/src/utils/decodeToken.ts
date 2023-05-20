import jwt_decode, { JwtPayload } from 'jwt-decode';

type Role = 'IncompleteAdmin' | 'Admin' | 'InvitedUser' | 'User';

export function decodeToken(token: string | undefined) {
    if (!token) {
        return {
            role: null,
        };
    }

    const decoded = jwt_decode<JwtPayload & { role: Role }>(token);
    return {
        role: decoded['role'],
    };
}
