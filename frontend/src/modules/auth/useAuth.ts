import { useContext, useMemo } from 'react';
import { AuthContext } from './AuthContext';
import { decodeToken } from '#utils';
import { usePaths } from '#hooks';
import { useNavigate } from 'react-router';

export function useAuth() {
    const paths = usePaths();
    const navigate = useNavigate();
    const { token, setToken, removeToken } = useContext(AuthContext);
    const { role } = useMemo(() => decodeToken(token), [token]);

    function handleLogout() {
        removeToken();
        navigate(paths.login, { replace: true });
    }

    return {
        isAuthenticated: !!token,
        token,
        role,
        setToken,
        logout: handleLogout,
    };
}
