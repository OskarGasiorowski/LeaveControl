import { useContext, useMemo } from 'react';
import { AuthContext } from './AuthContext';
import { decodeToken } from '#utils';

export function useAuth() {
    const { token, setToken } = useContext(AuthContext);
    const { role } = useMemo(() => decodeToken(token), [token]);

    return {
        isAuthenticated: !!token,
        token,
        role,
        setToken,
    };
}
