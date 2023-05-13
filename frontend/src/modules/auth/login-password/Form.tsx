import { FormControl, FormErrorMessage, FormLabel, Input, Stack } from '@chakra-ui/react';
import { UseFormReturn } from 'react-hook-form';
import { Type } from './Type';

interface Props {
    form: UseFormReturn<Type>;
}

export function Form({
    form: {
        register,
        formState: { errors },
    },
}: Props) {
    return (
        <Stack spacing='8'>
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
