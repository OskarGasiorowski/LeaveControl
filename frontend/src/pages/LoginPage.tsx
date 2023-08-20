import { LoginBigImage } from '#illustrations';
import { useBoolean, useLogin, usePaths } from '#hooks';
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

export function LoginPage() {
    const paths = usePaths();
    const visiblePassword = useBoolean();

    const { login, isLoading, error } = useLogin();
    const methods = useForm<Form>({
        resolver: yupResolver(validator),
        reValidateMode: 'onBlur',
        mode: 'onBlur',
    });

    function handleOnSubmit(form: Form) {
        login({ ...form });
    }

    const renderHead = (
        <Stack spacing={2} sx={{ mb: 5 }}>
            <Typography variant='h4'>Sign in to LeaveControl</Typography>

            <Stack direction='row' spacing={0.5}>
                <Typography variant='body2'>Want to create a new workspace?</Typography>

                <Link variant='subtitle2' to={paths.createAccount}>
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

            <Link
                to={paths.createAccount}
                variant='body2'
                color='inherit'
                underline='always'
                sx={{ alignSelf: 'flex-end' }}
            >
                Forgot password?
            </Link>

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
                Login
            </LoadingButton>
        </Stack>
    );

    return (
        <AuthLayout image={LoginBigImage}>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(handleOnSubmit)}>
                    {renderHead}

                    {renderForm}
                </form>
            </FormProvider>
        </AuthLayout>
    );
}
