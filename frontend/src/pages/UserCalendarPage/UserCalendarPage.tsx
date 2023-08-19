import { Calendar, selectedDatesAtom } from '#components';
import { RightSidebar } from '#modules/layout';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    HStack,
    Text,
    Textarea,
    VStack,
} from '@chakra-ui/react';
import { useParams } from 'react-router';
import { useAtom } from 'jotai';
import { useLeaveRequest, useUserCalendar } from '#hooks';
import { EditLeaveCard } from './components';
import { Container } from '@mui/material';

export function UserCalendarPage() {
    const { userId } = useParams<{ userId: string }>();
    // TODO hide those inside hooks and export it from module
    const [selectedDates, setSelectedDates] = useAtom(selectedDatesAtom);

    const { request, isPending } = useLeaveRequest(userId!, () => setSelectedDates([]));
    const { calendar } = useUserCalendar(userId);

    if (!userId) {
        // TODO not found page
        return <h1>not found</h1>;
    }

    if (!calendar) {
        return <h1>loading</h1>;
    }

    function handleRequest() {
        request({
            entry: selectedDates.map((date) => ({
                date,
                type: 'Full',
            })),
            reason: '',
        });
    }

    return (
        <Container maxWidth='xl'>
            <Calendar calendar={calendar} />
            <RightSidebar>
                {!!selectedDates.length && (
                    <Card>
                        <CardBody as={VStack} gap={2} alignItems='flex-start'>
                            <Text>Take: {selectedDates.length} days</Text>
                            <Textarea placeholder='Reason...' size='sm' />
                        </CardBody>
                        <CardFooter as={HStack} gap={1}>
                            <Button size='full' isLoading={isPending} onClick={handleRequest}>
                                Request
                            </Button>
                            <Button
                                size='full'
                                disabled={isPending}
                                onClick={() => setSelectedDates([])}
                            >
                                Clear
                            </Button>
                        </CardFooter>
                    </Card>
                )}

                <EditLeaveCard userId={userId} calendar={calendar} />
            </RightSidebar>
        </Container>
    );
}
