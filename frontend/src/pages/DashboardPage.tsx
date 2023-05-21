import { useCalendar } from '#hooks';
import { CalendarOverview } from '#components';
import { useState } from 'react';
import { Box, Button, HStack } from '@chakra-ui/react';
import * as dayjs from 'dayjs';

export function DashboardPage() {
    const [overviewMonth, setOverviewMonth] = useState(dayjs(Date.now()));
    useCalendar();

    return (
        <div>
            <HStack gap={5}>
                <Box>{overviewMonth.format('MMMM')}</Box>
                <Button onClick={() => setOverviewMonth((prev) => prev.add(-1, 'month'))}>
                    Prev
                </Button>
                <Button onClick={() => setOverviewMonth((prev) => prev.add(1, 'month'))}>
                    Next
                </Button>
            </HStack>
            <CalendarOverview month={overviewMonth} />
        </div>
    );
}
