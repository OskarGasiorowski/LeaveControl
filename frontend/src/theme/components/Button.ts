import { defineStyleConfig } from '@chakra-ui/react';

export const Button = defineStyleConfig({
    baseStyle: {
        fontWeight: 700,
        fontSize: '16px',
        rounded: '3xl',
        width: 'full',
        paddingY: 4,
    },
    defaultProps: {
        colorScheme: 'primary',
    },
});
