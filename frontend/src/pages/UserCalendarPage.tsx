import { Calendar, selectedDatesAtom } from '#components';
import { RightSidebar } from '#modules/layout';
import { Button, Card, CardBody, CardFooter, Text, Textarea, VStack } from '@chakra-ui/react';
import { useParams } from 'react-router';
import { useAtom } from 'jotai';
import { useLeaveRequest } from '#hooks';

export function UserCalendarPage() {
    const { userId } = useParams<{ userId: string }>();
    const [selectedDates, setSelectedDates] = useAtom(selectedDatesAtom);

    const { request, isPending } = useLeaveRequest(userId!, () => setSelectedDates([]));

    if (!userId) {
        // TODO not found page
        return <h1>not found</h1>;
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
        <>
            <Calendar userId={userId} />
            <RightSidebar>
                {!!selectedDates.length && (
                    <Card>
                        <CardBody as={VStack} gap={2} alignItems='flex-start'>
                            <Text>Take: {selectedDates.length} days</Text>
                            <Textarea placeholder='Reason...' size='sm' />
                        </CardBody>
                        <CardFooter>
                            <Button size='full' isLoading={isPending} onClick={handleRequest}>
                                Request
                            </Button>
                        </CardFooter>
                    </Card>
                )}
            </RightSidebar>
        </>
    );
}
