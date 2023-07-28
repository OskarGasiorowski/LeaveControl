import { Box, Portal } from '@chakra-ui/react';
import { useAtomValue, useSetAtom } from 'jotai';
import { rightSidebarWidthAtom, rightSidebarRef } from './atom.ts';
import { ReactNode, useEffect } from 'react';

interface Props {
    children: ReactNode;
}

export function RightSidebar({ children }: Props) {
    const ref = useAtomValue(rightSidebarRef);
    const setIsRightSidebarExistsAtom = useSetAtom(rightSidebarWidthAtom);

    useEffect(() => {
        setIsRightSidebarExistsAtom(96);

        return () => setIsRightSidebarExistsAtom(0);
    }, []);

    return (
        <Portal containerRef={ref}>
            <Box
                width={96}
                pos='fixed'
                h='full'
                borderLeft='1px'
                borderLeftColor='rgba(228, 228, 228, 0.1)'
                right={0}
                top={0}
                paddingX={10}
                paddingY={10}
            >
                {children}
            </Box>
        </Portal>
    );
}
