import { useCalendar } from '#hooks';
import { CalendarOverview } from '#components';
import { useMemo, useState } from 'react';
import { Box, Button, Card, CardBody, CardHeader, Heading, HStack, VStack } from '@chakra-ui/react';
import * as dayjs from 'dayjs';

export function DashboardPage() {
    const [overviewMonth, setOverviewMonth] = useState(dayjs(Date.now()));
    const { calendar } = useCalendar();

    const calendarEntries = useMemo(
        () =>
            calendar.map(({ surname, firstName, userId, leaves }) => ({
                displayName: firstName + ' ' + surname,
                userId: userId,
                leaves,
            })),
        [calendar],
    );

    return (
        <VStack gap={5}>
            <HStack gap={5}>
                <Box>{overviewMonth.format('MMMM')}</Box>
                <Button onClick={() => setOverviewMonth((prev) => prev.add(-1, 'month'))}>
                    Prev
                </Button>
                <Button onClick={() => setOverviewMonth((prev) => prev.add(1, 'month'))}>
                    Next
                </Button>
            </HStack>
            <Card>
                <CardHeader>
                    <Heading size='xl'>Calendar</Heading>
                </CardHeader>
                <CardBody>
                    <CalendarOverview userCalendars={calendarEntries} month={overviewMonth} />
                </CardBody>
            </Card>
        </VStack>
    );
}
