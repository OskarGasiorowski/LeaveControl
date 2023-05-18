import { FormControl, FormErrorMessage, FormLabel, Input, Stack } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { Type as FormType } from './Type';

export function Form() {
    const {
        formState: { errors },
        register,
    } = useFormContext<FormType>();

    return (
        <Stack spacing={5}>
            <FormControl isInvalid={!!errors.email}>
                <FormLabel htmlFor='email'>Email</FormLabel>
                <Input {...register('email')} id='email' />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.password}>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <Input {...register('password')} id='password' type='password' />
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>
        </Stack>
    );
}
