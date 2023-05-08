import { ChakraProvider } from '@chakra-ui/react';
import { CreateAccountPage } from './pages';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ChakraProvider>
                <CreateAccountPage />
            </ChakraProvider>
        </QueryClientProvider>
    );
}
