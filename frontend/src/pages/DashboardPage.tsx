import { useCalendar, usePaths } from '#hooks';
import { CalendarOverview, CarouselArrows } from '#components';
import { useMemo, useState } from 'react';
import * as dayjs from 'dayjs';
import { useNavigate } from 'react-router';
import { Box, Card, CardHeader, Container } from '@mui/material';

export function DashboardPage() {
    const navigate = useNavigate();
    const paths = usePaths();
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
        <Container maxWidth='xl'>
            <Card>
                <CardHeader
                    title='Calendar'
                    subheader='Leaves in your team'
                    action={
                        <CarouselArrows
                            onNext={() => setOverviewMonth((prev) => prev.add(1, 'month'))}
                            onPrev={() => setOverviewMonth((prev) => prev.add(-1, 'month'))}
                        >
                            {overviewMonth.format('MMMM')}
                        </CarouselArrows>
                    }
                />

                <Box sx={{ my: 3, mx: 3 }}>
                    <CalendarOverview
                        userCalendars={calendarEntries}
                        month={overviewMonth}
                        onClick={(userId) => navigate(paths.userCalendar.generate(userId))}
                    />
                </Box>
            </Card>
        </Container>
    );
}
