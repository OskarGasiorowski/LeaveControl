import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Heading,
    HStack,
    Spacer,
    Table,
    TableContainer,
    Tbody,
    Td,
    Tr,
    useDisclosure,
} from '@chakra-ui/react';
import { useUsers } from '#hooks';
import { CreateUserModal } from '#modules/create-user-modal';

export function UsersPage() {
    const { users } = useUsers();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Card>
                <CardHeader>
                    <HStack>
                        <Heading color='white' size='md'>
                            Users
                        </Heading>
                        <Spacer />
                        <Button onClick={onOpen}>Add user</Button>
                    </HStack>
                </CardHeader>
                <CardBody>
                    <TableContainer>
                        <Table variant='simple'>
                            <Tbody>
                                {users.map(({ id, firstName, surname, email }) => (
                                    <Tr key={id}>
                                        <Td>
                                            {firstName} {surname}
                                        </Td>
                                        <Td>{email}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </CardBody>
            </Card>
            <CreateUserModal isOpen={isOpen} onClose={onClose} />
        </>
    );
}
