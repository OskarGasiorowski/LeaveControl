import {
    Box,
    Container,
    Flex,
    Heading,
    Stack,
    FormControl,
    FormLabel,
    Input,
    Button,
    useBreakpointValue,
    FormErrorMessage,
} from '@chakra-ui/react';
import { BackgroundIllustration } from '#illustrations';
import { useCreateAccount } from '#hooks';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocation, useNavigate } from 'react-router';

type Form = {
    adminEmail: string;
    adminPassword: string;
};

const formSchema = Yup.object<Form>().shape({
    adminEmail: Yup.string()
        .required('Email is required.')
        .email('Email must be a valid email address.'),
    adminPassword: Yup.string()
        .required('Password is required.')
        .min(8, 'Password must be at least 8 characters long.'),
});

export function CreateAccountPage() {
    const breakpoint = useBreakpointValue({ base: false, lg: true });
    const navigate = useNavigate();
    const location = useLocation();
    const { createAccount } = useCreateAccount(() => navigate(from, { replace: true }));
    const from = location.state?.from?.pathname || '/test';

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Form>({
        resolver: yupResolver(formSchema),
        reValidateMode: 'onBlur',
        mode: 'onBlur',
    });

    function handleOnClick(form: Form) {
        createAccount({
            ...form,
        });
    }

    return (
        <Flex height='100vh' backgroundColor='#141416'>
            {breakpoint && (
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
            )}

            <Container height='full'>
                <Flex
                    gap={10}
                    height='full'
                    justifyContent='center'
                    alignContent='center'
                    flexDirection='column'
                    width='full'
                    color='#B1B5C3'
                >
                    <Heading color='#FCFCFD' textAlign='center'>
                        Create new account
                    </Heading>

                    <Stack
                        as='form'
                        spacing={8}
                        maxWidth={380}
                        width='full'
                        alignSelf='center'
                        onSubmit={handleSubmit(handleOnClick)}
                    >
                        <Stack spacing='5'>
                            <FormControl isInvalid={!!errors.adminEmail}>
                                <FormLabel htmlFor='adminEmail'>Email</FormLabel>
                                <Input
                                    {...register('adminEmail')}
                                    id='adminEmail'
                                    formNoValidate={true}
                                />
                                <FormErrorMessage>{errors.adminEmail?.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!errors.adminPassword}>
                                <FormLabel htmlFor='adminPassword'>Password</FormLabel>
                                <Input
                                    {...register('adminPassword')}
                                    id='adminPassword'
                                    autoComplete='current-password'
                                    type='password'
                                />
                                <FormErrorMessage>{errors.adminPassword?.message}</FormErrorMessage>
                            </FormControl>
                        </Stack>

                        <Button
                            colorScheme='blue'
                            size='lg'
                            rounded='3xl'
                            width='full'
                            type='submit'
                        >
                            Create account
                        </Button>
                    </Stack>
                </Flex>
            </Container>
        </Flex>
    );
}
