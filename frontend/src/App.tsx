import { Router } from './pages';
import { AuthProvider } from '#modules/auth';
import { ThemeProvider } from './theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

export function App() {
    return (
        <ThemeProvider>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />

                <AuthProvider>
                    <Router />
                </AuthProvider>
            </QueryClientProvider>
        </ThemeProvider>
    );
}
