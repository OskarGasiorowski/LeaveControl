import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { inputAnatomy } from '@chakra-ui/anatomy';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    inputAnatomy.keys,
);

const outline = definePartsStyle({
    field: {
        border: '2px solid',
        borderColor: '#353945',
        borderRadius: '12px',
        color: 'white',
    },
});

export const Input = defineMultiStyleConfig({
    variants: {
        outline,
    },
    defaultProps: {
        variant: 'outline',
        size: 'md',
    },
    sizes: {
        md: {
            field: {
                padding: '12px 16px',
                fontSize: 'sm',
                lineHeight: 'taller',
                height: 'unset',
            },
        },
    },
});
