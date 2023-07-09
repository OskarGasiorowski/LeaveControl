import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

interface Props {
    children: ReactNode;
}

export function Content({ children }: Props) {
    return (
        <Box ml={60} minHeight='100vh' paddingY={12} paddingX={16}>
            {children}
        </Box>
    );
}
