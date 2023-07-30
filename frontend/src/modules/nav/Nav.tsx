import { VStack } from '@chakra-ui/react';
import { NavLink } from './NavLink';
import { usePaths } from '#hooks';
import { InfoOutlineIcon, SunIcon, TimeIcon } from '@chakra-ui/icons';
import { AdminProtected } from '#modules/auth';

export function Nav() {
    const paths = usePaths();

    return (
        <VStack
            width={60}
            pos='fixed'
            h='full'
            borderRight='1px'
            borderRightColor='rgba(228, 228, 228, 0.1)'
            paddingX={5}
            paddingY={10}
            gap={0.5}
        >
            <NavLink href={paths.dashboard} label='Dashboard' icon={InfoOutlineIcon} />
            <NavLink href={paths.users} label='Users' icon={TimeIcon} />
            <AdminProtected>
                <NavLink href={paths.leaveRequests} label='Requests' icon={SunIcon} />
            </AdminProtected>
        </VStack>
    );
}
