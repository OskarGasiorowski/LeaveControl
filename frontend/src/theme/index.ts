import { extendTheme } from '@chakra-ui/react';
import * as Components from './components';
import { colors, fonts } from './fundations';

export const theme = extendTheme({
    colors,
    fonts,
    styles: {
        global: {
            body: {
                color: 'white',
            },
        },
    },
    components: {
        ...Components,
    },
});
