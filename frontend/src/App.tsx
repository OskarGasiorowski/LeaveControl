import { ChakraProvider } from '@chakra-ui/react';
import { CreateAccountPage, DashboardPage } from './pages';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider, ProtectedRoute } from '#modules/auth';
import { Route, Routes } from 'react-router';
import { theme } from './theme';

const queryClient = new QueryClient();

export function App() {
    return (
        <ChakraProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <Routes>
                        <Route path='/create-account' element={<CreateAccountPage />} />
                        <Route path='/login' element={<div>login</div>} />
                        <Route element={<ProtectedRoute />}>
                            <Route path='/dashboard' element={<DashboardPage />} />
                        </Route>
                    </Routes>
                </AuthProvider>
            </QueryClientProvider>
        </ChakraProvider>
    );
}
