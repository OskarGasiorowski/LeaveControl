import { Router } from './pages';
import { AuthProvider } from '#modules/auth';
import { ThemeProvider } from './theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SnackbarProvider } from 'notistack';

const queryClient = new QueryClient();

export function App() {
    return (
        <ThemeProvider>
            <SnackbarProvider maxSnack={3}>
                <QueryClientProvider client={queryClient}>
                    <ReactQueryDevtools initialIsOpen={false} />

                    <AuthProvider>
                        <Router />
                    </AuthProvider>
                </QueryClientProvider>
            </SnackbarProvider>
        </ThemeProvider>
    );
}
