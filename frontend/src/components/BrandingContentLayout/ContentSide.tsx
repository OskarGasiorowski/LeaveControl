import { Container } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

export function ContentSide({ children }: Props) {
    return <Container height='full'>{children}</Container>;
}
