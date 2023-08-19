import * as dayjs from 'dayjs';
import { times } from 'lodash';
import { useMemo } from 'react';
import { GetUserCalendarResponse } from '../../hooks/api';
import { FreeDay } from './FreeDay.tsx';
import { TakenDay } from './TakenDay.tsx';
import { leaveEditingAtom } from './atom.ts';
import { useAtomValue } from 'jotai';
import { Box, Grid, Typography } from '@mui/material';

interface Props {
    calendar: GetUserCalendarResponse;
    month: number;
    year: number;
}

export function Month({ month, year, calendar }: Props) {
    const leaveEditing = useAtomValue(leaveEditingAtom);
    const daysOfWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

    const cells = useMemo(() => {
        const firstDay = dayjs(new Date(year, month, 1, 12));
        const emptyDays = firstDay.day() === 0 ? 6 : firstDay.day() - 1;

        const leaves = calendar.leaves
            .filter((leave) => leave.id !== leaveEditing?.id)
            .concat(leaveEditing ? [leaveEditing] : [])
            .map((leave) =>
                leave.leaveDays.map(({ day }) => ({
                    day: new Date(day),
                    leaveId: leave.id,
                    status: leave.leaveStatus,
                })),
            )
            .flatMap((leave) => leave)
            .filter(({ day }) => day.getMonth() === month && day.getFullYear() === year);

        return (
            <>
                {times(emptyDays).map((index) => (
                    <Grid item key={`empty-${index}`} xs={1}>
                        <Box width='100%' height='100%' />
                    </Grid>
                ))}

                {times(firstDay.daysInMonth()).map((dayIndex) => {
                    const takenDay = leaves.find(({ day }) => day.getDate() === dayIndex + 1);

                    if (takenDay) {
                        return (
                            <TakenDay
                                key={dayIndex}
                                date={new Date(year, month, dayIndex + 1, 12)}
                                leaveId={takenDay.leaveId}
                                isPending={takenDay.status === 'pending'}
                            />
                        );
                    }

                    return (
                        <FreeDay key={dayIndex} date={new Date(year, month, dayIndex + 1, 12)} />
                    );
                })}
            </>
        );
    }, [month, calendar, leaveEditing, year]);

    return (
        <Grid item sm={12} md={6} lg={4} xl={3} width='100%'>
            <Typography variant='subtitle1' textAlign='center'>
                {dayjs(new Date(year, month, 1)).format('MMMM')}
            </Typography>
            <Grid container columns={7} spacing={1}>
                {daysOfWeek.map((day) => (
                    <Grid item key={day} xs={1}>
                        <Box width='full' sx={{ borderBottom: '1px solid white', marginBottom: 1 }}>
                            <Typography sx={{ textAlign: 'center' }} variant='body2'>
                                {day}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
                {cells}
            </Grid>
        </Grid>
    );
}
