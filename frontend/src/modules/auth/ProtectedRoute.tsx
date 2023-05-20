import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '#modules/auth/useAuth';
import { usePaths } from '#hooks';

export function ProtectedRoute() {
    const { isAuthenticated, role } = useAuth();
    const location = useLocation();
    const paths = usePaths();

    if (!isAuthenticated) {
        return <Navigate to={paths.login} state={{ from: location }} />;
    }

    if (role === 'IncompleteAdmin') {
        return <Navigate to={paths.setupAccount} state={{ from: location }} />;
    }

    return <Outlet />;
}
