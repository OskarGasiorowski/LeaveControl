import { useLocation } from 'react-router';
import { usePaths, useResponsive } from '#hooks';
import { useEffect } from 'react';
import { Box, Drawer, List, ListSubheader, Stack, styled } from '@mui/material';
import { Iconify, Logo, Scrollbar } from '#components';
import { NAV } from './config.ts';
import { NavLink } from './NavLink.tsx';
import { AdminProtected } from '#modules/auth';

export const StyledSubheader = styled(ListSubheader)(({ theme }) => ({
    ...theme.typography.overline,
    fontSize: 11,
    display: 'inline-flex',
    padding: '4px 8px 4px 12px',
    paddingTop: theme.spacing(2),
    marginBottom: 4,
    paddingBottom: theme.spacing(1),
    color: theme.palette.text.disabled,
    transition: theme.transitions.create(['color'], {
        duration: theme.transitions.duration.shortest,
    }),
}));

interface Props {
    openNav: boolean;
    onCloseNav: VoidFunction;
}

export function Nav({ openNav, onCloseNav }: Props) {
    const paths = usePaths();
    const { pathname } = useLocation();

    const lgUp = useResponsive('up', 'lg');

    useEffect(() => {
        if (openNav) {
            onCloseNav();
        }
    }, [pathname]);

    const renderContent = (
        <Scrollbar
            sx={{
                height: 1,
                '& .simplebar-content': {
                    height: 1,
                    display: 'flex',
                    flexDirection: 'column',
                },
            }}
        >
            <Logo sx={{ mt: 3, ml: 4, mb: 1 }} />

            <List disablePadding sx={{ px: 2 }}>
                <StyledSubheader disableGutters disableSticky>
                    Menu
                </StyledSubheader>

                <NavLink
                    href={paths.dashboard}
                    label='Dashboard'
                    icon={<Iconify icon='ic:outline-dashboard' />}
                />
                <NavLink href={paths.users} label='Users' icon={<Iconify icon='ph:users-bold' />} />
                <AdminProtected>
                    <NavLink
                        href={paths.leaveRequests}
                        label='Requests'
                        icon={<Iconify icon='icon-park-outline:vacation' />}
                    />
                </AdminProtected>
            </List>

            <Box sx={{ flexGrow: 1 }} />
        </Scrollbar>
    );

    return (
        <Box
            component='nav'
            sx={{
                flexShrink: { lg: 0 },
                width: { lg: NAV.W_VERTICAL },
            }}
        >
            {lgUp ? (
                <Stack
                    sx={{
                        height: 1,
                        position: 'fixed',
                        width: NAV.W_VERTICAL,
                        borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
                    }}
                >
                    {renderContent}
                </Stack>
            ) : (
                <Drawer
                    open={openNav}
                    onClose={onCloseNav}
                    PaperProps={{
                        sx: {
                            width: NAV.W_VERTICAL,
                        },
                    }}
                >
                    {renderContent}
                </Drawer>
            )}
        </Box>
    );
}
