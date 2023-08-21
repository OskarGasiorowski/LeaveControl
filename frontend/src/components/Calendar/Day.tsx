import { noop } from 'lodash';
import { Box, Grid, Typography, useTheme } from '@mui/material';

type Props = {
    day: number;
    color: { base: string; hover: string };
    disabled?: boolean;
    highlighted?: boolean;
    onClick: () => void;
    onMouseOver?: () => void;
    onMouseOut?: () => void;
    readonly: boolean;
};

export function Day({
    color: chosenColor,
    day,
    disabled = false,
    highlighted = false,
    onClick,
    onMouseOver,
    onMouseOut,
    readonly,
}: Props) {
    const theme = useTheme();
    const color = disabled
        ? { base: theme.palette.grey[400], hover: theme.palette.grey[400] }
        : { ...chosenColor, hover: readonly ? chosenColor.base : chosenColor.hover };

    return (
        <Grid item xs={1}>
            <Box
                sx={{
                    width: '100%',
                    backgroundColor: highlighted ? color.hover : color.base,
                    textAlign: 'center',
                    ':hover': {
                        backgroundColor: color.hover,
                        cursor: disabled ? 'not-allowed' : readonly ? 'unset' : 'pointer',
                    },
                    paddingY: 0.5,
                    borderRadius: 0.5,
                }}
                onClick={disabled || readonly ? noop : onClick}
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
            >
                <Typography variant='body2' sx={{ userSelect: 'none' }}>
                    {day}
                </Typography>
            </Box>
        </Grid>
    );
}
