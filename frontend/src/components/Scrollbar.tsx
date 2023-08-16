import { memo, forwardRef, ReactNode } from 'react';
import SimpleBar, { Props as SimpleBarProps } from 'simplebar-react';
import { Box, Theme, SxProps, styled, alpha } from '@mui/material';

export const StyledRootScrollbar = styled('div')(() => ({
    flexGrow: 1,
    height: '100%',
    overflow: 'hidden',
}));

export const StyledScrollbar = styled(SimpleBar)(({ theme }) => ({
    maxHeight: '100%',
    '& .simplebar-scrollbar': {
        '&:before': {
            backgroundColor: alpha(theme.palette.grey[600], 0.48),
        },
        '&.simplebar-visible:before': {
            opacity: 1,
        },
    },
    '& .simplebar-mask': {
        zIndex: 'inherit',
    },
}));

interface Props extends SimpleBarProps {
    children?: ReactNode;
    sx?: SxProps<Theme>;
}

// eslint-disable-next-line react/display-name
const _Scrollbar = forwardRef<HTMLDivElement, Props>(({ children, sx, ...other }, ref) => {
    const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent,
    );

    if (isMobile) {
        return (
            <Box ref={ref} sx={{ overflow: 'auto', ...sx }} {...other}>
                {children}
            </Box>
        );
    }

    return (
        <StyledRootScrollbar>
            <StyledScrollbar
                scrollableNodeProps={{
                    ref,
                }}
                clickOnTrack={false}
                sx={sx}
                {...other}
            >
                {children}
            </StyledScrollbar>
        </StyledRootScrollbar>
    );
});

export const Scrollbar = memo(_Scrollbar);
