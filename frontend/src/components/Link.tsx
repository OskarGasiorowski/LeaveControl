import { Link as ChakraLink } from '@chakra-ui/react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';

export function Link(props: Omit<LinkProps, 'as'>) {
    return <ChakraLink as={RouterLink} {...props} />;
}
