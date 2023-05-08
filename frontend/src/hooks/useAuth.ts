import { useContext } from 'react';
import { AuthContext } from '#modules/auth';

export function useAuth() {
    const { token, setToken } = useContext(AuthContext);

    return {
        isAuthenticated: !!token,
        token,
        setToken,
    };
}
