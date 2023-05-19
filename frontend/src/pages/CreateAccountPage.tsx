import { Stack, Button, Heading, Flex, Box } from '@chakra-ui/react';
import { useCreateAccount } from '#hooks';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import { LoginPassword } from '#modules/auth';
import { BrandingContentLayout, Link } from '#components';

export function CreateAccountPage() {
    const navigate = useNavigate();
    const { createAccount, isLoading, error } = useCreateAccount(() =>
        navigate('/dashboard', { replace: true }),
    );

    const methods = useForm<LoginPassword.Type>({
        resolver: yupResolver(LoginPassword.Validator()),
        reValidateMode: 'onBlur',
        mode: 'onBlur',
    });

    function handleOnClick(form: LoginPassword.Type) {
        createAccount({
            adminPassword: form.password,
            adminEmail: form.email,
        });
    }

    return (
        <BrandingContentLayout>
            <BrandingContentLayout.BrandingSide />

            <BrandingContentLayout.ContentSide>
                <Box>
                    Already have an account? <Link to='/login'>Login</Link>
                </Box>
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
                    <FormProvider {...methods}>
                        <Stack
                            as='form'
                            spacing={8}
                            maxWidth={380}
                            width='full'
                            alignSelf='center'
                            onSubmit={methods.handleSubmit(handleOnClick)}
                        >
                            <LoginPassword.Form errorSummary={error?.message} />

                            <Button size='lg' type='submit' isLoading={isLoading}>
                                Create account
                            </Button>
                        </Stack>
                    </FormProvider>
                </Flex>
            </BrandingContentLayout.ContentSide>
        </BrandingContentLayout>
    );
}
