import { Box, Heading, useBreakpointValue } from '@chakra-ui/react';
import { BackgroundIllustration } from '#illustrations';

export function LeftSideBranding() {
    const breakpoint = useBreakpointValue({ base: false, lg: true });

    if (!breakpoint) {
        return null;
    }

    return (
        <Box
            backgroundColor='#23262F'
            width='full'
            maxWidth='40%'
            minWidth='fit-content'
            height='full'
            backgroundImage={BackgroundIllustration}
            backgroundSize='cover'
            backgroundPosition='30% 40px'
            backgroundRepeat='no-repeat'
            paddingX={20}
            paddingY={20}
        >
            <Heading color='#FCFCFD'>Leave Control</Heading>
        </Box>
    );
}
