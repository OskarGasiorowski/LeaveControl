import { useBoolean, usePaths, useUsers } from '#hooks';
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
import { CreateUserModal } from '#modules/user-data';

export function UsersPage() {
    const { users } = useUsers();

    const newUserModal = useBoolean();

    return (
        <Container>
            <Stack direction='row' justifyContent='space-between' mb={4}>
                <Typography variant='h4' gutterBottom>
                    Users
                </Typography>
                <Button
                    onClick={newUserModal.onToggle}
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

            <CreateUserModal
                isOpen={newUserModal.value}
                onClose={newUserModal.onToggle}
                defaults={{ allowance: 25 }}
            />
        </Container>
    );
}
