import { defineStyleConfig } from '@chakra-ui/react';

export const Link = defineStyleConfig({
    variants: {
        primary: {
            color: 'primary.300',
            _hover: { color: 'primary.500' },
            _focus: {
                color: 'primary.600',
            },
        },
    },
    sizes: {
        xs: {
            fontSize: 'sm',
        },
    },
    defaultProps: {
        variant: 'primary',
    },
});
