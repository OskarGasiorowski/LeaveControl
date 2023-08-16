import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export function svgIcon(_: Theme) {
    return {
        MuiSvgIcon: {
            styleOverrides: {
                fontSizeLarge: {
                    width: 32,
                    height: 32,
                    fontSize: 'inherit',
                },
            },
        },
    };
}
