import { Nav } from '#modules/nav';
import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router';

export function Layout() {
    return (
        <Box minHeight='100vh' backgroundColor='background'>
            <Nav />
            <Box ml={60} minHeight='100vh' paddingY={12} paddingX={16}>
                <Outlet />
            </Box>
        </Box>
    );
}
