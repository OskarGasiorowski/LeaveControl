import {
    Collapse,
    IconButton,
    ListItemText,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableRow,
} from '@mui/material';
import { Leave } from 'hooks/api';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import { useState } from 'react';
import dayjs from 'dayjs';
import { useApprovePendingRequest, useRejectPendingRequest } from '#hooks';
import { LoadingButton } from '@mui/lab';

interface Props {
    startsAt: string;
    endsAt: string;
    userId: string;
    firstName: string;
    surname: string;
    leave: Leave;
}

export function Row({ startsAt, endsAt, firstName, surname, leave, userId }: Props) {
    const { approve, isApprovePending } = useApprovePendingRequest(userId, leave.id);
    const { reject, isRejectPending } = useRejectPendingRequest(userId, leave.id);

    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow
                hover
                key={leave.id}
                onClick={() => console.log('test')}
                sx={{ '& > *': { borderBottom: 'unset' } }}
            >
                <TableCell>
                    <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </TableCell>
                <TableCell>
                    <ListItemText
                        disableTypography
                        primary={`${firstName} ${surname}`}
                        primaryTypographyProps={{ typography: 'body2' }}
                    />
                </TableCell>
                <TableCell>
                    <ListItemText
                        disableTypography
                        primary={'email@domain.com'}
                        primaryTypographyProps={{ typography: 'body2' }}
                    />
                </TableCell>
                <TableCell>
                    <ListItemText
                        disableTypography
                        primary={leave.leaveDays.length}
                        primaryTypographyProps={{ typography: 'body2' }}
                    />
                </TableCell>
                <TableCell>
                    <ListItemText
                        disableTypography
                        primary={startsAt}
                        primaryTypographyProps={{ typography: 'body2' }}
                    />
                </TableCell>
                <TableCell>
                    <ListItemText
                        disableTypography
                        primary={endsAt}
                        primaryTypographyProps={{ typography: 'body2' }}
                    />
                </TableCell>
                <TableCell>
                    <Stack justifyContent='flex-end' direction='row' gap={1}>
                        <LoadingButton
                            variant='soft'
                            color='error'
                            loading={isRejectPending}
                            onClick={() => reject()}
                            disabled={isApprovePending}
                        >
                            Reject
                        </LoadingButton>
                        <LoadingButton
                            variant='soft'
                            color='success'
                            disabled={isRejectPending}
                            onClick={() => approve()}
                            loading={isApprovePending}
                        >
                            Approve
                        </LoadingButton>
                    </Stack>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout='auto' unmountOnExit>
                        <Table size='small' sx={{ marginY: 4 }}>
                            <TableBody>
                                {leave.leaveDays.map(({ day }) => (
                                    <TableRow key={dayjs(day).format('DD-MM-YYYY')}>
                                        <TableCell>{dayjs(day).format('DD-MM-YYYY')}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}
