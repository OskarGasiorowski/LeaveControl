import { VStack } from '@chakra-ui/react';
import { NavLink } from './NavLink';
import { usePaths } from '#hooks';
import { InfoOutlineIcon, TimeIcon } from '@chakra-ui/icons';

export function Nav() {
    const paths = usePaths();

    return (
        <VStack width='full' gap={0.5}>
            <NavLink href={paths.dashboard} label='Dashboard' icon={InfoOutlineIcon} />
            <NavLink href={paths.users} label='Users' icon={TimeIcon} />
        </VStack>
    );
}
