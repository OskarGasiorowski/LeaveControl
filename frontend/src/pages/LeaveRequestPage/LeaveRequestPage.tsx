import { usePendingRequests } from '#hooks';
import { Card, Container, Table, TableBody, TableContainer, Typography } from '@mui/material';
import { useMemo } from 'react';
import { TableHeadCustom } from '#components';
import dayjs from 'dayjs';
import { LeaveDay } from '../../hooks/api';
import { Row } from './components';

export function LeaveRequestPage() {
    const { pendingRequests: fetchedPendingRequests } = usePendingRequests();

    const pendingRequests = useMemo(() => {
        return fetchedPendingRequests.flatMap((r) => {
            const getStartAndEndsAt = (leaveDays: LeaveDay[]) => {
                const sorted = leaveDays.sort((ld) => dayjs(ld.day).unix());
                return {
                    startsAt: dayjs(sorted[0].day).format('DD-MM-YYYY'),
                    endsAt: dayjs(sorted[sorted.length - 1].day).format('DD-MM-YYYY'),
                };
            };
            return r.leaves.map((l) => ({
                userId: r.userId,
                firstName: r.firstName,
                surname: r.surname,
                leave: l,
                ...getStartAndEndsAt(l.leaveDays),
            }));
        });
    }, [fetchedPendingRequests]);

    return (
        <Container>
            <Typography variant='h4' gutterBottom>
                Leave requests
            </Typography>
            <Card>
                <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
                    <Table>
                        <TableHeadCustom
                            headLabel={[
                                { id: '', width: 40 },
                                { id: 'name', label: 'Name' },
                                { id: 'email', label: 'Email' },
                                { id: 'leave-days', label: 'Leave Days' },
                                { id: 'starts-at', label: 'Starts at' },
                                { id: 'ends-at', label: 'Ends at' },
                                { id: 'actions' },
                            ]}
                            rowCount={pendingRequests.length}
                        />
                        <TableBody>
                            {pendingRequests.map((pr) => (
                                <Row key={pr.leave.id} {...pr} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Container>
    );
}
