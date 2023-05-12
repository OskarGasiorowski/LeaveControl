import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '#modules/auth/useAuth';

export function ProtectedRoute() {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    return isAuthenticated ? <Outlet /> : <Navigate to='/login' state={{ from: location }} />;
}
