import { VStack } from '@chakra-ui/react';
import { NavLink } from './NavLink';
import { usePaths } from '#hooks';
import { InfoOutlineIcon, TimeIcon } from '@chakra-ui/icons';

export function Nav() {
    const paths = usePaths();

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
            <NavLink href={paths.dashboard} label='Dashboard' icon={InfoOutlineIcon} />
            <NavLink href={paths.users} label='Users' icon={TimeIcon} />
        </VStack>
    );
}
