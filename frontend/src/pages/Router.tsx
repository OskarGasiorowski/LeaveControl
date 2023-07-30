import { Navigate, Route, Routes } from 'react-router';
import { CreateAccountPage } from './CreateAccountPage';
import { LoginPage } from './LoginPage';
import { AdminProtectedRoute, ProtectedRoute } from '#modules/auth';
import { Layout } from '#modules/layout';
import { DashboardPage } from './DashboardPage';
import { usePaths } from '#hooks';
import { SetupAccountPage } from './SetupAccountPage';
import { UsersPage } from './UsersPage';
import { UserCalendarPage } from './UserCalendarPage';
import { LeaveRequestPage } from './LeaveRequestPage.tsx';

export function Router() {
    const paths = usePaths();

    return (
        <Routes>
            <Route path='/' element={<Navigate to={paths.login} />} />
            <Route path={paths.createAccount} element={<CreateAccountPage />} />
            <Route path={paths.setupAccount} element={<SetupAccountPage />} />
            <Route path={paths.login} element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                    <Route path={paths.dashboard} element={<DashboardPage />} />
                    <Route path={paths.users} element={<UsersPage />} />
                    <Route path={paths.userCalendar.template} element={<UserCalendarPage />} />

                    <Route element={<AdminProtectedRoute />}>
                        <Route path={paths.leaveRequests} element={<LeaveRequestPage />} />
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
}
