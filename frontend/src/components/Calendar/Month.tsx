import { Grid, GridItem, Text } from '@chakra-ui/react';
import * as dayjs from 'dayjs';
import { times } from 'lodash';
import { useMemo } from 'react';
import { GetUserCalendarResponse } from '../../hooks/api';
import { FreeDay } from './FreeDay.tsx';
import { TakenDay } from './TakenDay.tsx';

interface Props {
    calendar: GetUserCalendarResponse;
    month: number;
}

export function Month({ month, calendar }: Props) {
    const daysOfWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

    const cells = useMemo(() => {
        const firstDay = dayjs(new Date(2023, month, 1));
        const emptyDays = firstDay.day() === 0 ? 6 : firstDay.day() - 1;

        const leaves = calendar.leaves
            .flatMap((leave) => leave?.leaveDays)
            .map((leaveDays) => new Date(leaveDays.day))
            .filter((day) => day.getMonth() === month && day.getFullYear() === 2023);

        return (
            <>
                {times(emptyDays).map((index) => (
                    <GridItem key={`empty-${index}`} />
                ))}

                {times(firstDay.daysInMonth()).map((dayIndex) =>
                    leaves.some((day) => day.getDate() === dayIndex) ? (
                        <TakenDay key={dayIndex} day={dayIndex + 1} month={month} />
                    ) : (
                        <FreeDay key={dayIndex} day={dayIndex + 1} month={month} />
                    ),
                )}
            </>
        );
    }, [month, calendar]);

    return (
        <Grid templateColumns='repeat(7, 1fr)' justifyItems='center' gap={0} rowGap={1.5}>
            {daysOfWeek.map((day) => (
                <GridItem
                    key={day}
                    width='full'
                    paddingX={1}
                    paddingY={1}
                    borderBottom='1px solid white'
                    marginBottom={1}
                    height='fit-content'
                >
                    <Text fontSize='xs' textAlign='center'>
                        {day}
                    </Text>
                </GridItem>
            ))}

            {cells}
        </Grid>
    );
}
