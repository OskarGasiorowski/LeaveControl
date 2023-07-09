import { Box } from '@chakra-ui/react';
import { Sidebar as InternalSidebar } from './Sidebar.tsx';
import { Content as InternalContent } from './Content.tsx';
import { ReactElement } from 'react';

interface Props {
    children: Array<ReactElement<typeof InternalContent> | ReactElement<typeof InternalSidebar>>;
}

export function SidebarLayout({ children }: Props) {
    return (
        <Box minHeight='100vh' backgroundColor='background'>
            {children}
        </Box>
    );
}

export namespace SidebarLayout {
    export const Sidebar = InternalSidebar;
    export const Content = InternalContent;
}
