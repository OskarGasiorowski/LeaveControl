import { BrandingContentLayout } from '#components';
import { Button, Flex, Heading, Stack } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginPassword } from '#modules/auth';
import { useLogin } from '#hooks';
import { useLocation, useNavigate } from 'react-router';

export function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const redirectTo = location.state?.from?.pathname || '/dashboard';

    const { login, isLoading, error } = useLogin(() => navigate(redirectTo, { replace: true }));
    const methods = useForm<LoginPassword.Type>({
        resolver: yupResolver(LoginPassword.Validator()),
        reValidateMode: 'onBlur',
        mode: 'onBlur',
    });

    function handleOnSubmit(form: LoginPassword.Type) {
        login({ ...form });
    }

    return (
        <BrandingContentLayout>
            <BrandingContentLayout.BrandingSide />

            <BrandingContentLayout.ContentSide>
                <Flex
                    gap={10}
                    height='full'
                    justifyContent='center'
                    alignContent='center'
                    flexDirection='column'
                    width='full'
                >
                    <Heading color='#FCFCFD' textAlign='center'>
                        Login
                    </Heading>
                    <FormProvider {...methods}>
                        <Stack
                            as='form'
                            spacing={7}
                            maxWidth={380}
                            width='full'
                            alignSelf='center'
                            onSubmit={methods.handleSubmit(handleOnSubmit)}
                        >
                            <LoginPassword.Form errorSummary={error?.message} />

                            <Button size='lg' type='submit' isLoading={isLoading}>
                                Login
                            </Button>
                        </Stack>
                    </FormProvider>
                </Flex>
            </BrandingContentLayout.ContentSide>
        </BrandingContentLayout>
    );
}
