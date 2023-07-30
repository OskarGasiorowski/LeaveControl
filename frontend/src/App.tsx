import { ChakraProvider } from '@chakra-ui/react';
import { Router } from './pages';
import { AuthProvider } from '#modules/auth';
import { theme } from './theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

export function App() {
    return (
        <ChakraProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />

                <AuthProvider>
                    <Router />
                </AuthProvider>
            </QueryClientProvider>
        </ChakraProvider>
    );
}
