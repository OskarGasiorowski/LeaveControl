import { useBoolean } from '#hooks';
import { Box } from '@mui/material';
import { Nav } from './Nav';
import { Main } from './Main';
import { Outlet } from 'react-router';

export function DashboardLayout() {
    const nav = useBoolean();

    return (
        <Box
            sx={{
                minHeight: 1,
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
            }}
        >
            <Nav openNav={nav.value} onCloseNav={() => nav.setValue(false)} />

            <Main>
                <Outlet />
            </Main>
        </Box>
    );
}
