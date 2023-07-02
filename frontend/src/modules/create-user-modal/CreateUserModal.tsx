import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
} from '@chakra-ui/react';
import { useAddUser } from '#hooks';
import { useForm } from 'react-hook-form';

interface Form {
    firstName: string;
    surname: string;
    email: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export function CreateUserModal({ isOpen, onClose }: Props) {
    const { addUser, isLoading } = useAddUser(onClose);
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<Form>({
        reValidateMode: 'onBlur',
        mode: 'onBlur',
    });

    function handleAddUser(form: Form) {
        addUser({
            ...form,
        });
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size='xl'>
            <ModalOverlay />
            <ModalContent as='form' onSubmit={handleSubmit(handleAddUser)}>
                <ModalHeader>Create user</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing={5}>
                        <FormControl isInvalid={!!errors.firstName}>
                            <FormLabel htmlFor='firstName'>First name</FormLabel>
                            <Input {...register('firstName')} id='firstName' />
                            <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.surname}>
                            <FormLabel htmlFor='surname'>Surname</FormLabel>
                            <Input {...register('surname')} id='surname' />
                            <FormErrorMessage>{errors.surname?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.email}>
                            <FormLabel htmlFor='email'>Email</FormLabel>
                            <Input {...register('email')} id='email' />
                            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                        </FormControl>
                    </Stack>
                </ModalBody>

                <ModalFooter>
                    <Button type='submit' isLoading={isLoading}>Create</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
