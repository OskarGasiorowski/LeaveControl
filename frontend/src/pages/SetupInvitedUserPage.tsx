import { useParams } from 'react-router';
import { AuthCompactLayout } from '#modules/layouts';
import { IconButton, InputAdornment, Stack, Typography } from '@mui/material';
import { Iconify, Link, TermsAndCondition, TextField } from '#components';
import { useBoolean, usePaths } from '#hooks';
import { LoadingButton } from '@mui/lab';
import { FormProvider, useForm } from 'react-hook-form';

export function SetupInvitedUserPage() {
    const visiblePassword = useBoolean();
    const { jwt } = useParams<{ jwt: string }>();
    const paths = usePaths();

    const methods = useForm<{ password: string }>({
        mode: 'onChange',
    });

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
                <Stack spacing={3} alignItems='center'>
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
                        // loading={isSubmitting}
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
