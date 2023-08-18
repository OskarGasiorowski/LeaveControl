import { Checkbox, Iconify, Link, TextField } from '#components';
import { useAuth } from '#modules/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { usePaths, useSetupAccount } from '#hooks';
import { FormProvider, useForm } from 'react-hook-form';
import { AuthLayout } from '#modules/layouts';
import { Divider, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { LoginBigImage } from '#illustrations';

type Form = {
    defaultAllowance: number;
    acceptanceRequired: boolean;
    allowanceOverflowAllowed: boolean;
    adminFirstName: string;
    adminSurname: string;
};

export function SetupAccountPage() {
    const paths = usePaths();
    const navigate = useNavigate();
    const { role, logout } = useAuth();
    const { setupAccount, isLoading } = useSetupAccount();
    const methods = useForm<Form>({ defaultValues: { defaultAllowance: 25 } });

    useEffect(() => {
        if (role !== 'IncompleteAdmin') {
            navigate(paths.dashboard, { replace: true });
        }
    }, [role]);

    function onFormSubmitted(form: Form) {
        setupAccount({
            ...form,
        });
    }

    return (
        <AuthLayout image={LoginBigImage}>
            <Stack spacing={2} sx={{ mb: 5 }}>
                <Typography variant='h4'>Setup account.</Typography>

                <Stack direction='row' spacing={0.5}>
                    <Typography variant='body2'>Wrong account?</Typography>
                    <Link
                        onClick={(event) => {
                            event.preventDefault();
                            logout();
                        }}
                        variant='subtitle2'
                        to={paths.login}
                    >
                        Logout
                    </Link>
                </Stack>
            </Stack>

            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onFormSubmitted)}>
                    <Stack spacing={2.5}>
                        <TextField name='adminFirstName' label='First name' />
                        <TextField name='adminSurname' label='Surname' />

                        <Divider />

                        <Stack>
                            <TextField
                                type='number'
                                name='defaultAllowance'
                                label='Default Allowance'
                                sx={{ mb: 1 }}
                            />

                            <Checkbox
                                name='acceptanceRequired'
                                label='Leave request has to be accepted.'
                            />
                            <Checkbox
                                name='allowanceOverflowAllowed'
                                label='Employee can exceed allowance limit.'
                            />
                        </Stack>

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
                            Setup
                        </LoadingButton>
                    </Stack>
                </form>
            </FormProvider>
        </AuthLayout>
    );
}
