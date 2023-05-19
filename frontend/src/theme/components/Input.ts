import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { inputAnatomy } from '@chakra-ui/anatomy';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    inputAnatomy.keys,
);

const outline = definePartsStyle({
    field: {
        border: '2px solid',
        borderColor: 'gray.700',
        borderRadius: '12px',
        color: 'white',
        _error: {
            borderColor: 'danger.700',
            boxShadow: 'none',
        },
        _hover: {
            borderColor: 'primary.500',
        },
        _focus: {
            borderColor: 'primary.700',
            boxShadow: 'none',
        },
        _focusVisible: {
            borderColor: 'primary.700',
            boxShadow: 'none',
        },
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
                paddingY: 2,
                paddingX: 3,
                fontSize: 'sm',
                lineHeight: 'taller',
                height: 'unset',
            },
        },
    },
});
