import { Navigate, Route, Routes } from 'react-router';
import { LoginPage } from './LoginPage';
import { usePaths } from '#hooks';
import { CreateWorkspacePage } from './CreateWorkspacePage';
import { SetupAccountPage } from './SetupAccountPage';
import { AdminProtectedRoute, ProtectedRoute } from '#modules/auth';
import { DashboardPage } from './DashboardPage';
import { UsersPage } from './UsersPage';
import { UserCalendarPage } from './UserCalendarPage';
import { LeaveRequestPage } from './LeaveRequestPage/LeaveRequestPage.tsx';
import { DashboardLayout } from '#modules/layouts';

export function Router() {
    const paths = usePaths();

    return (
        <Routes>
            <Route path='/' element={<Navigate to={paths.login} />} />
            <Route path={paths.createAccount} element={<CreateWorkspacePage />} />
            <Route path={paths.setupWorkspace} element={<SetupAccountPage />} />
            <Route path={paths.login} element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
                <Route element={<DashboardLayout />}>
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
