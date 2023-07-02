import {
    Card,
    CardBody,
    CardHeader,
    Heading,
    Table,
    TableContainer,
    Tbody,
    Td,
    Tr,
} from '@chakra-ui/react';
import { useUsers } from '#hooks';

export function UsersPage() {
    const { users } = useUsers();

    return (
        <Card>
            <CardHeader>
                <Heading color='white' size='md'>
                    Users
                </Heading>
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
    );
}
