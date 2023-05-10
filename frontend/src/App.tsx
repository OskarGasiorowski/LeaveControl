import { ChakraProvider } from '@chakra-ui/react';
import { CreateAccountPage } from './pages';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider, ProtectedRoute } from '#modules/auth';
import { Route, Routes } from 'react-router';

const queryClient = new QueryClient();

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ChakraProvider>
                <AuthProvider>
                    <Routes>
                        <Route path='/' element={<CreateAccountPage />} />
                        <Route path='/error' element={<div>error</div>} />
                        <Route element={<ProtectedRoute />}>
                            <Route path='/test' element={<div>logged in</div>} />
                        </Route>
                    </Routes>
                </AuthProvider>
            </ChakraProvider>
        </QueryClientProvider>
    );
}
