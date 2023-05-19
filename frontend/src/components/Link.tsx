import { Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

export function Link(props: Omit<RouterLinkProps, 'as'> & ChakraLinkProps) {
    return <ChakraLink as={RouterLink} {...props} />;
}
