import { extendTheme } from '@chakra-ui/react';
import * as Components from './components';

export const theme = extendTheme({
    colors: {
        primary: {
            100: '#D1CAF7',
            200: '#B4A9F0',
            300: '#9788E9',
            400: '#7A67E2',
            500: '#6C5DD3',
            600: '#584FB8',
            700: '#443E9D',
            800: '#312E83',
            900: '#1F1E68',
        },
    },
    components: {
        ...Components,
    },
});
