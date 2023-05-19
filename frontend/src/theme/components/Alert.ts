import { alertAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    alertAnatomy.keys,
);

const baseStyle = definePartsStyle({
    container: {
        borderRadius: '12px',
        color: 'white',
        background: 'danger.500',
    },
});

export const Alert = defineMultiStyleConfig({
    baseStyle,
});
