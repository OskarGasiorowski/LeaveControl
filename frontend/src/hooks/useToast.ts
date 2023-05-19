import { useToast as useChakraToast } from '@chakra-ui/react';

export function useToast() {
    const toast = useChakraToast();

    return {
        errorToast: (message: string) =>
            toast({ title: message, status: 'error', duration: 10000, isClosable: true }),
    };
}
