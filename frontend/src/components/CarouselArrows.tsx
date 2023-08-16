// @mui
import { styled, alpha } from '@mui/material/styles';
import Stack, { StackProps } from '@mui/material/Stack';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { Iconify } from './Iconify';
import { ReactNode } from 'react';

interface StyledIconButtonProps extends IconButtonProps {
    filled?: boolean;
    shape?: 'circular' | 'rounded';
    hasChild?: boolean;
}

const StyledIconButton = styled(IconButton, {
    shouldForwardProp: (prop) => prop !== 'filled' && prop !== 'hasChild' && prop !== 'shape',
})<StyledIconButtonProps>(({ filled, shape, hasChild, theme }) => ({
    color: 'inherit',
    transition: theme.transitions.create('all', {
        duration: theme.transitions.duration.shorter,
    }),
    ...(shape === 'rounded' && {
        borderRadius: theme.shape.borderRadius * 1.5,
    }),
    ...(!filled && {
        opacity: 0.48,
        '&:hover': {
            opacity: 1,
        },
    }),
    ...(filled && {
        color: alpha(theme.palette.common.white, 0.8),
        backgroundColor: alpha(theme.palette.grey[900], 0.48),
        '&:hover': {
            color: theme.palette.common.white,
            backgroundColor: theme.palette.grey[900],
        },
    }),
    ...(hasChild && {
        zIndex: 9,
        top: '50%',
        position: 'absolute',
        marginTop: theme.spacing(-2.5),
    }),
}));

// ----------------------------------------------------------------------

interface Props extends StackProps {
    shape?: 'circular' | 'rounded';
    filled?: boolean;
    children?: ReactNode;
    onNext?: VoidFunction;
    onPrev?: VoidFunction;
    leftButtonProps?: IconButtonProps;
    rightButtonProps?: IconButtonProps;
}

export function CarouselArrows({
    shape = 'circular',
    filled = false,
    onNext,
    onPrev,
    children,
    leftButtonProps,
    rightButtonProps,
    sx,
    ...other
}: Props) {
    const LeftIcon = () => (
        <Iconify
            icon='eva:arrow-ios-forward-fill'
            sx={{
                transform: ' scaleX(-1)',
            }}
        />
    );

    const RightIcon = () => <Iconify icon='eva:arrow-ios-forward-fill' />;

    return (
        <Stack direction='row' alignItems='center' display='inline-flex' sx={sx} {...other}>
            <StyledIconButton filled={filled} shape={shape} onClick={onPrev} {...leftButtonProps}>
                <LeftIcon />
            </StyledIconButton>
            {children}
            <StyledIconButton filled={filled} shape={shape} onClick={onNext} {...rightButtonProps}>
                <RightIcon />
            </StyledIconButton>
        </Stack>
    );
}
