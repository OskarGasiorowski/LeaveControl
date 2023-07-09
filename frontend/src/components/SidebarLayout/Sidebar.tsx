import { VStack } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

export function Sidebar({ children }: Props) {
    return (
        <VStack
            width={60}
            pos='fixed'
            h='full'
            borderRight='1px'
            borderRightColor='rgba(228, 228, 228, 0.1)'
            paddingX={5}
            paddingY={10}
        >
            {children}
        </VStack>
    );
}
