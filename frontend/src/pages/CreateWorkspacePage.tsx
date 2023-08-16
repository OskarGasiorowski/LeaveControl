import { LoginBigImage } from '#illustrations';
import { useBoolean, useCreateAccount, usePaths } from '#hooks';
import { AuthLayout } from '#modules/layouts';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, IconButton, InputAdornment, Stack, Typography } from '@mui/material';
import { Iconify, Link, TextField } from '#components';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';

type Form = {
    email: string;
    password: string;
};

const validator = Yup.object<Form>().shape({
    email: Yup.string()
        .required('Email is required.')
        .email('Email must be a valid email address.'),
    password: Yup.string()
        .required('Password is required.')
        .min(8, 'Password must be at least 8 characters long.'),
});

export function CreateWorkspacePage() {
    const paths = usePaths();
    const visiblePassword = useBoolean();

    const { createAccount, isLoading, error } = useCreateAccount();

    const methods = useForm<Form>({
        resolver: yupResolver(validator),
        reValidateMode: 'onBlur',
        mode: 'onBlur',
    });

    function handleOnClick(form: Form) {
        createAccount({
            adminPassword: form.password,
            adminEmail: form.email,
        });
    }

    const renderHead = (
        <Stack spacing={2} sx={{ mb: 5 }}>
            <Typography variant='h4'>Get started absolutely free</Typography>

            <Stack direction='row' spacing={0.5}>
                <Typography variant='body2'>Want to login?</Typography>

                <Link variant='subtitle2' to={paths.login}>
                    Click here!
                </Link>
            </Stack>
        </Stack>
    );

    const renderForm = (
        <Stack spacing={2.5}>
            {!!error?.message && <Alert severity='error'>{error?.message}</Alert>}

            <TextField name='email' label='Email address' />

            <TextField
                name='password'
                label='Password'
                type={visiblePassword.value ? 'text' : 'password'}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position='end'>
                            <IconButton onClick={visiblePassword.onToggle} edge='end'>
                                <Iconify
                                    icon={
                                        visiblePassword.value
                                            ? 'solar:eye-bold'
                                            : 'solar:eye-closed-bold'
                                    }
                                />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

            <LoadingButton
                fullWidth
                color='inherit'
                size='large'
                type='submit'
                variant='contained'
                loading={isLoading}
                endIcon={<Iconify icon='eva:arrow-ios-forward-fill' />}
                sx={{ justifyContent: 'space-between', pl: 2, pr: 1.5 }}
            >
                Create workspace
            </LoadingButton>
        </Stack>
    );

    return (
        <AuthLayout image={LoginBigImage}>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(handleOnClick)}>
                    {renderHead}

                    {renderForm}
                </form>
            </FormProvider>
            <Typography
                component='div'
                sx={{
                    color: 'text.secondary',
                    mt: 2.5,
                    typography: 'caption',
                    textAlign: 'center',
                }}
            >
                {'By signing up, I agree to '}
                <Link to={paths.createAccount} underline='always' color='text.primary'>
                    Terms of Service
                </Link>
                {' and '}
                <Link to={paths.createAccount} underline='always' color='text.primary'>
                    Privacy Policy
                </Link>
                .
            </Typography>
        </AuthLayout>
    );
}
