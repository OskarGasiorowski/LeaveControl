import { ReactNode, useMemo } from 'react';
import { darkMode, contrast, presets } from './options';
import { palette } from './palette.ts';
import { shadows } from './shadows.ts';
import { customShadows } from './custom-shadows.ts';
import { typography } from './typography.ts';
import merge from 'lodash/merge';
import { createTheme, ThemeOptions, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { componentsOverrides } from './overrides';
import CssBaseline from '@mui/material/CssBaseline';

interface Props {
    children: ReactNode;
}

export function ThemeProvider({ children }: Props) {
    const darkModeOption = darkMode('dark');
    const presetsOption = presets('default');
    const contrastOption = contrast(true, 'dark');

    const baseOption = useMemo(
        () => ({
            palette: palette('dark'),
            shadows: shadows('dark'),
            customShadows: customShadows('dark'),
            typography,
            shape: { borderRadius: 8 },
        }),
        [],
    );

    const memoizedValue = useMemo(
        () =>
            merge(
                // Base
                baseOption,
                // Direction: remove if not in use
                // Dark mode: remove if not in use
                darkModeOption,
                // Presets: remove if not in use
                presetsOption,
                // Contrast: remove if not in use
                contrastOption.theme,
            ),
        [baseOption, darkModeOption, presetsOption, contrastOption.theme],
    );

    const theme = createTheme(memoizedValue as ThemeOptions);
    theme.components = merge(componentsOverrides(theme), contrastOption.components);

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </MuiThemeProvider>
    );
}
