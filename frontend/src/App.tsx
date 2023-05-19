import { ChakraProvider } from '@chakra-ui/react';
import { CreateAccountPage, DashboardPage, LoginPage } from './pages';
import { AuthProvider, ProtectedRoute } from '#modules/auth';
import { Navigate, Route, Routes } from 'react-router';
import { theme } from './theme';
import { Layout } from '#modules/layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export function App() {
    return (
        <ChakraProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <Routes>
                        <Route path='/' element={<Navigate to='/login' />} />
                        <Route path='/create-account' element={<CreateAccountPage />} />
                        <Route path='/login' element={<LoginPage />} />
                        <Route element={<ProtectedRoute />}>
                            <Route element={<Layout />}>
                                <Route path='/dashboard' element={<DashboardPage />} />
                                <Route path='/settings' element={<div>settings</div>} />
                            </Route>
                        </Route>
                    </Routes>
                </AuthProvider>
            </QueryClientProvider>
        </ChakraProvider>
    );
}
