import { Box, ListItemText, Tooltip } from '@mui/material';
import {
    NavConfigProps,
    NavItemProps,
    StyledDotIcon,
    StyledIcon,
    StyledItem,
} from './NavItem.styles';
import { Iconify, Link } from '#components';

type Props = NavItemProps & {
    config: NavConfigProps;
};

export function NavItem({ item, open, depth, active, config, externalLink, ...other }: Props) {
    const { title, path, icon, info, children, disabled, caption } = item;

    const subItem = depth !== 1;

    const renderContent = (
        <StyledItem
            disableGutters
            disabled={disabled}
            active={active}
            depth={depth}
            config={config}
            {...other}
        >
            <>
                {icon && <StyledIcon size={config.iconSize}>{icon}</StyledIcon>}

                {subItem && (
                    <StyledIcon size={config.iconSize}>
                        <StyledDotIcon active={active} />
                    </StyledIcon>
                )}
            </>

            {!(config.hiddenLabel && !subItem) && (
                <ListItemText
                    primary={title}
                    secondary={
                        caption ? (
                            <Tooltip title={caption} placement='top-start'>
                                <span>{caption}</span>
                            </Tooltip>
                        ) : null
                    }
                    primaryTypographyProps={{
                        noWrap: true,
                        typography: 'body2',
                        textTransform: 'capitalize',
                        fontWeight: active ? 'fontWeightSemiBold' : 'fontWeightMedium',
                    }}
                    secondaryTypographyProps={{
                        noWrap: true,
                        component: 'span',
                        typography: 'caption',
                        color: 'text.disabled',
                    }}
                />
            )}

            {info && (
                <Box component='span' sx={{ ml: 1, lineHeight: 0 }}>
                    {info}
                </Box>
            )}

            {!!children && (
                <Iconify
                    width={16}
                    icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
                    sx={{ ml: 1, flexShrink: 0 }}
                />
            )}
        </StyledItem>
    );

    // Default
    return (
        <Link
            to={path}
            underline='none'
            color='inherit'
            sx={{
                ...(disabled && {
                    cursor: 'default',
                }),
            }}
        >
            {renderContent}
        </Link>
    );
}
