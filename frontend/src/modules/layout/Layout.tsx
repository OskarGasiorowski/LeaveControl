import { Nav } from '#modules/nav';
import { Box, HStack } from '@chakra-ui/react';
import { Outlet } from 'react-router';

export function Layout() {
    return (
        <HStack minHeight='100vh' backgroundColor='background'>
            <Nav />
            <Box minHeight='100vh' width='full' paddingY={12} paddingX={16}>
                <Outlet />
            </Box>
        </HStack>
    );
}
