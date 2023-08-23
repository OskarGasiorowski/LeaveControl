import { Navigate, Route, Routes } from 'react-router';
import { LoginPage } from './LoginPage';
import { usePaths } from '#hooks';
import { CreateWorkspacePage } from './CreateWorkspacePage';
import { SetupAccountPage } from './SetupAccountPage';
import { AdminProtectedRoute, ProtectedRoute } from '#modules/auth';
import { DashboardPage } from './DashboardPage';
import { UsersPage } from './UsersPage';
import { UserCalendarPage } from './UserCalendarPage';
import { DashboardLayout } from '#modules/layouts';
import { LeaveRequestPage } from './LeaveRequestPage';
import { UserCalendarOverviewPage } from './UserCalendarOverviewPage.tsx';
import { SetupInvitedUserPage } from './SetupInvitedUserPage.tsx';

export function Router() {
    const paths = usePaths();

    return (
        <Routes>
            <Route path='/' element={<Navigate to={paths.login} />} />
            <Route path={paths.createAccount} element={<CreateWorkspacePage />} />
            <Route path={paths.setupWorkspace} element={<SetupAccountPage />} />
            <Route path={paths.login} element={<LoginPage />} />
            <Route path={paths.setupInvitedUser} element={<SetupInvitedUserPage />} />
            <Route element={<ProtectedRoute />}>
                <Route element={<DashboardLayout />}>
                    <Route path={paths.dashboard} element={<DashboardPage />} />
                    <Route
                        path={paths.userCalendar.template}
                        element={<UserCalendarOverviewPage />}
                    />
                    <Route path={paths.myCalendar} element={<UserCalendarPage />} />

                    <Route element={<AdminProtectedRoute />}>
                        <Route path={paths.users} element={<UsersPage />} />
                        <Route path={paths.leaveRequests} element={<LeaveRequestPage />} />
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
}
