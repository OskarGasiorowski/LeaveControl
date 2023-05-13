import { ReactNode } from 'react';
import { Flex } from '@chakra-ui/react';
import { BrandingSide as InternalBrandingSide } from './BrandingSide';
import { ContentSide as InternalContentSide } from './ContentSide';

interface Props {
    children: ReactNode;
}

export function BrandingContentLayout({ children }: Props) {
    return (
        <Flex height='100vh' backgroundColor='#141416'>
            {children}
        </Flex>
    );
}

export namespace BrandingContentLayout {
    export const BrandingSide = InternalBrandingSide;
    export const ContentSide = InternalContentSide;
}
