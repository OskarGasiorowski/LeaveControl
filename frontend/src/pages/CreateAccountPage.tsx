import {
    Box,
    Container,
    Flex,
    Heading,
    Stack,
    FormControl,
    FormLabel,
    Input,
    InputGroup, Button, useBreakpointValue
} from '@chakra-ui/react'
import { BackgroundIllustration } from '#illustrations';

export function CreateAccountPage() {
    const breakpoint = useBreakpointValue({ base: false, lg: true });

    return (
        <Flex height="100vh" backgroundColor="#141416">
            {breakpoint && (
                <Box
                    backgroundColor="#23262F"
                    width="full"
                    maxWidth="40%"
                    minWidth="fit-content"
                    height="full"
                    backgroundImage={BackgroundIllustration}
                    backgroundSize="cover"
                    backgroundPosition="30% 40px"
                    backgroundRepeat="no-repeat"
                    paddingX={20}
                    paddingY={20}
                >
                    <Heading color="#FCFCFD">Leave Control</Heading>
                </Box>
            )}

            <Container height="full">
                <Flex gap={10} height="full" justifyContent="center" alignContent="center" flexDirection="column" width="full" color="#B1B5C3">
                    <Heading color="#FCFCFD" textAlign="center">Create new account</Heading>

                    <Stack spacing={8} maxWidth={380} width="full" alignSelf="center">
                        <Stack spacing="5">
                            <FormControl>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <Input color="" id="email" type="email" />
                            </FormControl>

                            <FormControl>
                                <FormLabel htmlFor="password">Password</FormLabel>
                                <InputGroup>
                                    <Input
                                        id="password"
                                        name="password"
                                        autoComplete="current-password"
                                        required
                                    />
                                </InputGroup>
                            </FormControl>
                        </Stack>

                        <Button colorScheme="blue" size="lg" rounded="3xl" width="full">Create account</Button>
                    </Stack>

                </Flex>
            </Container>
        </Flex>
    )
}