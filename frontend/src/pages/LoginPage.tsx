import { BrandingContentLayout } from '#components';
import { Button, Stack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginPassword } from '#modules/auth';

export function LoginPage() {
    const form = useForm<LoginPassword.Type>({
        resolver: yupResolver(LoginPassword.Validator),
        reValidateMode: 'onBlur',
        mode: 'onBlur',
    });

    function handleOnSubmit(form: LoginPassword.Type) {
        console.log(form);
    }

    return (
        <BrandingContentLayout>
            <BrandingContentLayout.BrandingSide />

            <BrandingContentLayout.ContentSide>
                <Stack
                    as='form'
                    spacing={8}
                    maxWidth={380}
                    width='full'
                    alignSelf='center'
                    onSubmit={form.handleSubmit(handleOnSubmit)}
                >
                    <LoginPassword.Form form={form} />

                    <Button size='lg' type='submit'>
                        Login
                    </Button>
                </Stack>
            </BrandingContentLayout.ContentSide>
        </BrandingContentLayout>
    );
}
