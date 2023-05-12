import { extendTheme } from '@chakra-ui/react';
import * as Components from './components';
import { colors } from './fundations';

export const theme = extendTheme({
    colors,
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
