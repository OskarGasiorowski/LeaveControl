import { Nav } from '#modules/nav';
import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router';
import { Provider, useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import { rightSidebarWidthAtom, rightSidebarRef } from './atom.ts';

function _Layout() {
    const ref = useRef(null);
    const setAtomRef = useSetAtom(rightSidebarRef);
    const rightSidebarWidth = useAtomValue(rightSidebarWidthAtom);

    useEffect(() => {
        setAtomRef(ref);
    }, [ref]);

    return (
        <Box ref={ref} minHeight='100vh' backgroundColor='background'>
            <Nav />
            <Box mr={rightSidebarWidth} ml={60} minHeight='100vh' paddingY={12} paddingX={16}>
                <Outlet />
            </Box>
        </Box>
    );
}

export const Layout = () => (
    <Provider>
        <_Layout />
    </Provider>
);
