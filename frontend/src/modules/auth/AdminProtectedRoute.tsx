import { useAuth } from '#modules/auth/useAuth.ts';
import { usePaths } from '#hooks';
import { Navigate, Outlet } from 'react-router';

export function AdminProtectedRoute() {
    const { role } = useAuth();
    const paths = usePaths();

    if (role !== 'Admin') {
        return <Navigate to={paths.dashboard} replace />;
    }

    return <Outlet />;
}