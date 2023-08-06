import { usePendingRequests } from '#hooks';
import {
    AccordionButton,
    AccordionIcon,
    Button,
    Card,
    CardBody,
    CardHeader,
    Heading,
    HStack,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import { useMemo } from 'react';

export function LeaveRequestPage() {
    const { pendingRequests: fetchedPendingRequests } = usePendingRequests();

    const pendingRequests = useMemo(() => {
        return fetchedPendingRequests.flatMap((r) =>
            r.leaves.map((l) => ({
                userId: r.userId,
                firstName: r.firstName,
                surname: r.surname,
                leave: l,
            })),
        );
    }, [fetchedPendingRequests]);

    return (
        <Card>
            <CardHeader>
                <HStack>
                    <Heading color='white' size='md'>
                        Leave requests
                    </Heading>
                </HStack>
            </CardHeader>
            <CardBody>
                <TableContainer>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th>Leave days</Th>
                                <Th />
                            </Tr>
                        </Thead>
                        <Tbody>
                            {pendingRequests.map(({ userId, firstName, surname, leave }) => (
                                <Tr key={leave.id}>
                                    <Td>
                                        {firstName} {surname}
                                    </Td>
                                    <Td>{leave.leaveDays.length}</Td>
                                    <Td>
                                        <HStack gap={2}>
                                            <Button>Approve</Button>
                                            <Button>Decline</Button>
                                        </HStack>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </CardBody>
        </Card>
    );
}
