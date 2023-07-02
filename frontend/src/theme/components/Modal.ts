import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { modalAnatomy } from '@chakra-ui/anatomy';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    modalAnatomy.keys,
);

const baseStyle = definePartsStyle({
    dialog: {
        bg: 'background',
    },
});

export const Modal = defineMultiStyleConfig({
    baseStyle,
});
