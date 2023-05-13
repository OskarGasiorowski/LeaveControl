import { Stack, Button } from '@chakra-ui/react';
import { useCreateAccount } from '#hooks';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import { LoginPassword } from '#modules/auth';
import { BrandingContentLayout } from '#components';

const formSchema = LoginPassword.Validator;

export function CreateAccountPage() {
    const navigate = useNavigate();
    const { createAccount } = useCreateAccount(() => navigate('/dashboard', { replace: true }));

    const form = useForm<LoginPassword.Type>({
        resolver: yupResolver(formSchema),
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
                <Stack
                    as='form'
                    spacing={8}
                    maxWidth={380}
                    width='full'
                    alignSelf='center'
                    onSubmit={form.handleSubmit(handleOnClick)}
                >
                    <LoginPassword.Form form={form} />

                    <Button size='lg' type='submit'>
                        Create account
                    </Button>
                </Stack>
            </BrandingContentLayout.ContentSide>
        </BrandingContentLayout>
    );
}
