import { BrandingContentLayout, Link } from '#components';
import { useAuth } from '#modules/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { usePaths, useSetupAccount } from '#hooks';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Spacer,
    Stack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

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
    const { role } = useAuth();
    const { setupAccount, isLoading } = useSetupAccount();
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<Form>({ defaultValues: { defaultAllowance: 25 } });

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
        <BrandingContentLayout>
            <BrandingContentLayout.BrandingSide />

            <BrandingContentLayout.ContentSide>
                <Flex
                    gap={3}
                    height='full'
                    justifyContent='center'
                    alignContent='center'
                    flexDirection='column'
                    width='full'
                >
                    <Box width='fit-content' alignSelf='flex-end' marginTop={20}>
                        <Link to={paths.createAccount} size='xs'>
                            Logout
                        </Link>
                    </Box>
                    <Spacer />
                    <Heading color='white' textAlign='center'>
                        Setup account
                    </Heading>
                    <Stack
                        as='form'
                        spacing={7}
                        maxWidth={380}
                        width='full'
                        alignSelf='center'
                        onSubmit={handleSubmit(onFormSubmitted)}
                    >
                        <Stack spacing={5}>
                            <FormControl isInvalid={!!errors.adminSurname}>
                                <FormLabel htmlFor='adminFirstName'>First name</FormLabel>
                                <Input {...register('adminFirstName')} id='adminFirstName' />
                                <FormErrorMessage>
                                    {errors.adminFirstName?.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!errors.adminSurname}>
                                <FormLabel htmlFor='adminSurname'>Surname</FormLabel>
                                <Input {...register('adminSurname')} id='adminSurname' />
                                <FormErrorMessage>{errors.adminSurname?.message}</FormErrorMessage>
                            </FormControl>

                            <Divider marginY={8} />

                            <FormControl isInvalid={!!errors.defaultAllowance}>
                                <FormLabel htmlFor='defaultAllowance'>Allowance</FormLabel>
                                <Input
                                    {...register('defaultAllowance')}
                                    id='defaultAllowance'
                                    type='number'
                                />
                                <FormErrorMessage>
                                    {errors.defaultAllowance?.message}
                                </FormErrorMessage>
                            </FormControl>

                            <Checkbox {...register('acceptanceRequired')} id='acceptanceRequired'>
                                Leave request has to be accepted.
                            </Checkbox>
                            <Checkbox
                                {...register('allowanceOverflowAllowed')}
                                id='allowanceOverflowAllowed'
                            >
                                Employee can exceed allowance limit.
                            </Checkbox>
                        </Stack>

                        <Button size='lg' type='submit' isLoading={isLoading}>
                            Setup
                        </Button>
                    </Stack>
                    <Spacer />
                </Flex>
            </BrandingContentLayout.ContentSide>
        </BrandingContentLayout>
    );
}
