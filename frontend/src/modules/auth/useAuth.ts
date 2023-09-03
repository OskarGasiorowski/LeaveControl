import { useContext, useMemo } from 'react';
import { AuthContext } from './AuthContext';
import { decodeToken } from '#utils';
import { usePaths } from '#hooks';
import { useNavigate } from 'react-router';
import jwtDecode from 'jwt-decode';

export function useAuth() {
    const paths = usePaths();
    const navigate = useNavigate();
    const { token, setToken, removeToken } = useContext(AuthContext);
    const { role } = useMemo(() => decodeToken(token), [token]);

    function handleLogout() {
        removeToken();
        navigate(paths.login, { replace: true });
    }

    const userId = useMemo(() => (token ? jwtDecode<{ sub: string }>(token).sub : ''), [token]);

    return {
        isAuthenticated: !!token,
        token,
        userId: userId,
        role,
        setToken,
        logout: handleLogout,
    };
}
