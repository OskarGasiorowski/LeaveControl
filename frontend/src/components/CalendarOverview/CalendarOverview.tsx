import * as dayjs from 'dayjs';
import { useMemo } from 'react';
import { times } from 'lodash';
import { Row } from './Row';
import { RoundRobin } from '#utils';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export type Leave = {
    id: string;
    reason: string;
    leaveDays: { day: Date; type: 'Full' }[];
};

type UserEntry = {
    userId: string;
    displayName: string;
    leaves: Leave[];
};

interface Props {
    userCalendars: UserEntry[];
    month: dayjs.Dayjs;
    onClick: (userId: string) => void;
}

export function CalendarOverview({ userCalendars, month, onClick }: Props) {
    const end = useMemo(() => dayjs(month).endOf('month'), [month]);
    const colorPalette = useMemo(
        () =>
            new RoundRobin([
                '#FFA2C0',
                '#A0D7E7',
                '#CFC8FF',
                '#3F8CFF',
                '#6C5DD3',
                '#FFCE73',
                '#7FBA7A',
                '#FF754C',
            ]),
        [],
    );

    return (
        <TableContainer>
            <Table sx={{ tableLayout: 'fixed' }}>
                <TableHead>
                    <TableRow sx={{ backgroundColor: 'inherit' }}>
                        <TableCell sx={{ paddingLeft: 2, paddingY: 1 }} width={140}>
                            Users
                        </TableCell>
                        {times(end.date()).map((day) => (
                            <TableCell
                                align='center'
                                sx={{
                                    paddingX: 0.5,
                                    paddingY: 1,
                                    ':last-child': { paddingRight: 1 },
                                }}
                                key={day}
                            >
                                {day + 1}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userCalendars?.map(({ displayName, leaves, userId }) => (
                        <Row
                            key={displayName}
                            displayName={displayName}
                            leaves={leaves.map((leave) => ({
                                ...leave,
                                color: colorPalette.next(),
                            }))}
                            month={month}
                            onClick={() => onClick(userId)}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
