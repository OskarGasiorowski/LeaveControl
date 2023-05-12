import { VStack } from '@chakra-ui/react';
import { NavLink } from './NavLink';

export function Nav() {
    return (
        <VStack
            width={{ base: 'full', md: 60 }}
            h='100vh'
            borderRight='1px'
            borderRightColor='rgba(228, 228, 228, 0.1)'
            paddingX={5}
            paddingY={10}
            gap={0.5}
        >
            <NavLink href='/dashboard' label='Dashboard' />
            <NavLink href='/settings' label='Settings' />
        </VStack>
    );
}
