import { Theme } from '@mui/material/styles';

export function appBar(_: Theme) {
    return {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                },
            },
        },
    };
}
