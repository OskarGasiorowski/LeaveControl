export function usePaths() {
    return {
        login: '/login',
        createAccount: '/create-account',
        dashboard: '/dashboard',
        users: '/users',
        setupAccount: '/setup-account',
        // TODO think about smarter way of doing it
        userCalendar: {
            template: '/user-calendar/:id',
            generate: (userId: string) => `/user-calendar/${userId}`,
        },
    };
}
