import { useContext } from 'react';
import { AuthContext } from './AuthContext';

export function useAuth() {
    const { token, setToken } = useContext(AuthContext);

    return {
        isAuthenticated: !!token,
        token,
        setToken,
    };
}
