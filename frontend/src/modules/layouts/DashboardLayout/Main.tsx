import { useResponsive } from '#hooks';
import { Box, BoxProps } from '@mui/material';
import { HEADER, NAV } from './config';

const SPACING = 8;

export function Main({ children, sx, ...other }: BoxProps) {
    const lgUp = useResponsive('up', 'lg');

    return (
        <Box
            component='main'
            sx={{
                flexGrow: 1,
                minHeight: 1,
                display: 'flex',
                flexDirection: 'column',
                py: `${HEADER.H_MOBILE + SPACING}px`,
                ...(lgUp && {
                    px: 2,
                    py: `${HEADER.H_DESKTOP + SPACING}px`,
                    width: `calc(100% - ${NAV.W_VERTICAL}px)`,
                }),
                ...sx,
            }}
            {...other}
        >
            {children}
        </Box>
    );
}
