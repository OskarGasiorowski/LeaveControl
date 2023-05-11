import { ReactNode } from 'react';
import { Flex } from '@chakra-ui/react';

interface Props {
    children: ReactNode;
}

export function Layout({ children }: Props) {
    return (
        <Flex height='100vh' backgroundColor='#141416'>
            {children}
        </Flex>
    );
}
