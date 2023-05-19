import { Navigate, Route, Routes } from 'react-router';
import { CreateAccountPage } from './CreateAccountPage';
import { LoginPage } from './LoginPage';
import { ProtectedRoute } from '#modules/auth';
import { Layout } from '#modules/layout';
import { DashboardPage } from './DashboardPage';
import { usePaths } from '#hooks';

export function Router() {
    const paths = usePaths();

    return (
        <Routes>
            <Route path='/' element={<Navigate to={paths.login} />} />
            <Route path={paths.createAccount} element={<CreateAccountPage />} />
            <Route path={paths.login} element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                    <Route path={paths.dashboard} element={<DashboardPage />} />
                    <Route path='/settings' element={<div>settings</div>} />
                </Route>
            </Route>
        </Routes>
    );
}
