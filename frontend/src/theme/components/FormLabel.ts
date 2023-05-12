import { ComponentStyleConfig, defineStyleConfig } from '@chakra-ui/react';

export const FormLabel: ComponentStyleConfig = defineStyleConfig({
    baseStyle: {
        textTransform: 'uppercase',
        fontWeight: 700,
        fontSize: 'xs',
        color: '#B1B5C4',
        marginBottom: 3,
    },
});
