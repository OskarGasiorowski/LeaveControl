export function usePaths() {
    return {
        login: '/login',
        createAccount: '/create-workspace',
        dashboard: '/dashboard',
        users: '/users',
        setupWorkspace: '/setup-workspace',
        // TODO think about smarter way of doing it
        userCalendar: {
            template: '/user-calendar/:userId',
            generate: (userId: string) => `/user-calendar/${userId}`,
        },
        handleSetupInvitedUser: '/invite/setup/token',
        setupInvitedUser: '/invite/setup',
        myCalendar: '/user-calendar/me',
        leaveRequests: 'requests',
    };
}
