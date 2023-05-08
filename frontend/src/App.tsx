import { ChakraProvider } from '@chakra-ui/react';
import { CreateAccountPage } from './pages';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from '#modules/auth';

const queryClient = new QueryClient();

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ChakraProvider>
                <AuthProvider>
                    <CreateAccountPage />
                </AuthProvider>
            </ChakraProvider>
        </QueryClientProvider>
    );
}
