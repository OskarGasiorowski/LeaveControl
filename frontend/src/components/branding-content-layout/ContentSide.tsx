import { Container, Flex, Heading } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

export function ContentSide({ children }: Props) {
    return (
        <Container height='full'>
            <Flex
                gap={10}
                height='full'
                justifyContent='center'
                alignContent='center'
                flexDirection='column'
                width='full'
            >
                <Heading color='#FCFCFD' textAlign='center'>
                    Create new account
                </Heading>

                {children}
            </Flex>
        </Container>
    );
}
