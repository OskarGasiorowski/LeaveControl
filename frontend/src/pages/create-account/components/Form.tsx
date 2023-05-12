import { FormControl, FormErrorMessage, FormLabel, Input, Stack } from '@chakra-ui/react';
import { UseFormReturn } from 'react-hook-form';
import { Form as FormType } from '../types';

interface Props {
    form: UseFormReturn<FormType>;
}

export function Form({
    form: {
        register,
        formState: { errors },
    },
}: Props) {
    return (
        <Stack spacing='8'>
            <FormControl isInvalid={!!errors.adminEmail}>
                <FormLabel htmlFor='adminEmail'>Email</FormLabel>
                <Input {...register('adminEmail')} id='adminEmail' />
                <FormErrorMessage>{errors.adminEmail?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.adminPassword}>
                <FormLabel htmlFor='adminPassword'>Password</FormLabel>
                <Input {...register('adminPassword')} id='adminPassword' type='password' />
                <FormErrorMessage>{errors.adminPassword?.message}</FormErrorMessage>
            </FormControl>
        </Stack>
    );
}
