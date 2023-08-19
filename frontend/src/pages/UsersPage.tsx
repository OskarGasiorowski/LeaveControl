import { useUsers } from '#hooks';
import {
    Button,
    Card,
    Container,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from '@mui/material';
import { Iconify, TableHeadCustom } from '#components';
import { Link } from 'react-router-dom';

export function UsersPage() {
    const { users } = useUsers();

    return (
        <Container>
            <Stack direction='row' justifyContent='space-between' mb={4}>
                <Typography variant='h4' gutterBottom>
                    Users
                </Typography>
                <Button
                    component={Link}
                    to=''
                    variant='contained'
                    startIcon={<Iconify icon='mingcute:add-line' />}
                >
                    New User
                </Button>
            </Stack>
            <Card>
                <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
                    <Table>
                        <TableHeadCustom
                            headLabel={[
                                { id: 'name', label: 'Name' },
                                { id: 'email', label: 'Email' },
                            ]}
                            rowCount={users.length}
                        />
                        <TableBody>
                            {users.map(({ id, firstName, surname, email }) => (
                                <TableRow key={id}>
                                    <TableCell>
                                        {firstName} {surname}
                                    </TableCell>
                                    <TableCell>{email}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Container>
    );

    // return (
    //     <>
    //         <Card>
    //             <CardHeader>
    //                 <HStack>
    //                     <Heading color='white' size='md'>
    //                         Users
    //                     </Heading>
    //                     <Spacer />
    //                     <Button onClick={onOpen}>Add user</Button>
    //                 </HStack>
    //             </CardHeader>
    //             <CardBody>
    //                 <TableContainer>
    //                     <Table variant='simple'>
    //                         <Tbody>
    //                             {users.map(({ id, firstName, surname, email }) => (
    //                                 <Tr key={id}>
    //                                     <Td>
    //                                         {firstName} {surname}
    //                                     </Td>
    //                                     <Td>{email}</Td>
    //                                 </Tr>
    //                             ))}
    //                         </Tbody>
    //                     </Table>
    //                 </TableContainer>
    //             </CardBody>
    //         </Card>
    //         <CreateUserModal isOpen={isOpen} onClose={onClose} />
    //     </>
    // );
}
