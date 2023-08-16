import { useLocation } from 'react-router';
import { Link } from '#components';
import { alpha, styled } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import { ListItemText } from '@mui/material';
import { StyledIcon } from '#modules/layouts/DashboardLayout/NavItem.styles.ts';
import { ReactElement } from 'react';

interface Props {
    href: string;
    label: string;
    icon: ReactElement;
}

export const StyledItem = styled(ListItemButton, {
    shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>(({ active, theme }) => {
    const activeStyles = {
        root: {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.primary.main
                    : theme.palette.primary.light,
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
            '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.16),
            },
        },
        sub: {
            color: theme.palette.text.primary,
            backgroundColor: 'transparent',
            '&:hover': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    };

    return {
        // Root item
        padding: '4px 8px 4px 12px',
        marginBottom: 4,
        borderRadius: 8,
        minHeight: 44,
        color: theme.palette.text.secondary,

        ...(active && {
            ...activeStyles.root,
        }),
    };
});

export function NavLink({ href, label, icon }: Props) {
    const location = useLocation();
    const isActive = location.pathname === href;

    return (
        <Link underline='none' color='inherit' to={href}>
            <StyledItem disableGutters active={isActive}>
                <StyledIcon size={24}>{icon}</StyledIcon>

                <ListItemText
                    primary={label}
                    primaryTypographyProps={{
                        noWrap: true,
                        typography: 'body2',
                        textTransform: 'capitalize',
                        fontWeight: isActive ? 'fontWeightSemiBold' : 'fontWeightMedium',
                    }}
                    secondaryTypographyProps={{
                        noWrap: true,
                        component: 'span',
                        typography: 'caption',
                        color: 'text.disabled',
                    }}
                />
            </StyledItem>
        </Link>
    );
}
