import { Navigate, useNavigate } from 'react-router';
import { AuthCompactLayout } from '#modules/layouts';
import { IconButton, InputAdornment, Stack, Typography } from '@mui/material';
import { Iconify, Link, TermsAndCondition, TextField } from '#components';
import { useBoolean, useChangePassword, usePaths } from '#hooks';
import { LoadingButton } from '@mui/lab';
import { FormProvider, useForm } from 'react-hook-form';
import { useAuth } from '#modules/auth';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type Form = {
    password: string;
};
const validator = Yup.object<Form>().shape({
    password: Yup.string()
        .required('Password is required.')
        .min(8, 'Password must be at least 8 characters long.'),
});

export function SetupInvitedUserPage() {
    const visiblePassword = useBoolean();
    const paths = usePaths();
    const auth = useAuth();
    const navigate = useNavigate();
    const { changePassword, isChangePasswordPending } = useChangePassword(() =>
        navigate(paths.dashboard, { replace: true }),
    );

    const methods = useForm<Form>({
        resolver: yupResolver(validator),
        reValidateMode: 'onBlur',
        mode: 'onBlur',
    });

    if (auth.role !== 'InvitedUser') {
        return <Navigate to={paths.login} />;
    }

    function handleSubmit(form: Form) {
        changePassword({ ...form });
    }

    return (
        <AuthCompactLayout>
            <Stack spacing={1} sx={{ my: 5 }}>
                <Typography variant='h3'>Setup your password!</Typography>

                <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    You've been invited to \workspace\ workspace. Setup your password to finish up
                    creating account.
                </Typography>
            </Stack>
            <FormProvider {...methods}>
                <Stack
                    component='form'
                    spacing={3}
                    alignItems='center'
                    onSubmit={methods.handleSubmit(handleSubmit)}
                >
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
                        size='large'
                        type='submit'
                        variant='contained'
                        loading={isChangePasswordPending}
                    >
                        Setup
                    </LoadingButton>
                    <TermsAndCondition />
                    <Link
                        to={paths.login}
                        color='inherit'
                        variant='subtitle2'
                        sx={{
                            alignItems: 'center',
                            display: 'inline-flex',
                        }}
                    >
                        <Iconify icon='eva:arrow-ios-back-fill' width={16} />
                        Return to sign in
                    </Link>
                </Stack>
            </FormProvider>
        </AuthCompactLayout>
    );
}
