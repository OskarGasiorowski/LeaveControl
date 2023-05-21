import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { alertAnatomy } from '@chakra-ui/anatomy';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    alertAnatomy.keys,
);

const baseStyle = definePartsStyle({
    container: {
        background: 'transparent',
        paddingX: 3,
        paddingY: 7,
        boxShadow: '0px 10px 20px 20px rgb(0 0 0 / 10%)',
        color: 'white',
    },
});

export const Card = defineMultiStyleConfig({
    baseStyle,
});
