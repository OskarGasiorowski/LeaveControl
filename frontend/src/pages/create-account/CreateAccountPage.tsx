import { Stack, Button } from '@chakra-ui/react';
import { useCreateAccount } from '#hooks';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import { Layout, LeftSideBranding, Form, RightSideContent } from './components';
import { Form as FormType } from './types';

const formSchema = Yup.object<FormType>().shape({
    adminEmail: Yup.string()
        .required('Email is required.')
        .email('Email must be a valid email address.'),
    adminPassword: Yup.string()
        .required('Password is required.')
        .min(8, 'Password must be at least 8 characters long.'),
});

export function CreateAccountPage() {
    const navigate = useNavigate();
    const { createAccount } = useCreateAccount(() => navigate('/dashboard', { replace: true }));

    const form = useForm<FormType>({
        resolver: yupResolver(formSchema),
        reValidateMode: 'onBlur',
        mode: 'onBlur',
    });

    function handleOnClick(form: FormType) {
        createAccount({
            ...form,
        });
    }

    return (
        <Layout>
            <LeftSideBranding />

            <RightSideContent>
                <Stack
                    as='form'
                    spacing={8}
                    maxWidth={380}
                    width='full'
                    alignSelf='center'
                    onSubmit={form.handleSubmit(handleOnClick)}
                >
                    <Form form={form} />

                    <Button size='lg' type='submit'>
                        Create account
                    </Button>
                </Stack>
            </RightSideContent>
        </Layout>
    );
}
