import { Dialog, DialogTitle, Divider, Stack } from '@mui/material';
import { Checkbox, Iconify, TextField } from '#components';
import { LoadingButton } from '@mui/lab';
import { FormProvider, useForm } from 'react-hook-form';
import { useAddUser } from '#hooks';

type Form = {
    defaultAllowance: number;
    acceptanceRequired: boolean;
    allowanceOverflowAllowed: boolean;
    firstName: string;
    surname: string;
    email: string;
};

interface Props {
    isOpen: boolean;
    onClose: () => void;
    defaults: {
        allowance: number;
    };
}

export function CreateUserModal({ isOpen, onClose, defaults }: Props) {
    const methods = useForm<Form>({ defaultValues: { defaultAllowance: defaults.allowance } });

    const { addUser, isLoading } = useAddUser(onClose);

    function onFormSubmitted(form: Form) {
        addUser({
            email: form.email,
            surname: form.surname,
            firstName: form.surname,
        });
    }

    return (
        <Dialog open={isOpen} fullWidth maxWidth='xs' onClose={onClose} sx={{ padding: 4 }}>
            <DialogTitle>New user</DialogTitle>

            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onFormSubmitted)}>
                    <Stack spacing={2.5} sx={{ px: 3, pb: 4 }}>
                        <TextField name='firstName' label='First name' />
                        <TextField name='surname' label='Surname' />
                        <TextField name='email' label='Email' />

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
        </Dialog>
    );
}
