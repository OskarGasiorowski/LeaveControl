import { Calendar, selectedDatesAtom, TextField } from '#components';
import { useParams } from 'react-router';
import { useAtom } from 'jotai';
import { useLeaveRequest, useUserCalendar } from '#hooks';
import { Button, Card, Container, Grid, Stack, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';

export function UserCalendarPage() {
    const { userId } = useParams<{ userId: string }>();
    // TODO hide those inside hooks and export it from module
    const [selectedDates, setSelectedDates] = useAtom(selectedDatesAtom);

    const { request, isPending } = useLeaveRequest(userId!, () => setSelectedDates([]));
    const { calendar } = useUserCalendar(userId);
    const methods = useForm<{ reason: string }>();

    if (!userId) {
        // TODO not found page
        return <h1>not found</h1>;
    }

    if (!calendar) {
        return <h1>loading</h1>;
    }

    function handleRequest({ reason }: { reason: string }) {
        request({
            entry: selectedDates.map((date) => ({
                date,
                type: 'Full',
            })),
            reason: reason,
        });
    }

    return (
        <Container maxWidth='xl'>
            <Grid container columnSpacing={3}>
                <Grid xs={12} md={8} lg={9}>
                    <Calendar calendar={calendar} />
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    {!!selectedDates.length && (
                        <Card sx={{ p: 3, width: '100%' }}>
                            <Typography sx={{ marginBottom: -0.5 }} variant='subtitle2' gutterBottom>
                                Book a leave
                            </Typography>
                            <Stack spacing={2}>
                                <Typography variant='h3'>{selectedDates.length} days</Typography>
                                <FormProvider {...methods}>
                                    <form onSubmit={methods.handleSubmit(handleRequest)}>
                                        <TextField
                                            name='reason'
                                            label='Reason'
                                            multiline
                                            rows={4}
                                        />
                                    </form>
                                </FormProvider>

                                <Stack direction='row' spacing={1.5}>
                                    <Button disabled={isPending} fullWidth variant='contained'>
                                        Clear
                                    </Button>

                                    <LoadingButton
                                        loading={isPending}
                                        fullWidth
                                        variant='contained'
                                        color='primary'
                                    >
                                        Request
                                    </LoadingButton>
                                </Stack>
                            </Stack>
                        </Card>
                    )}
                </Grid>
                {/*<RightSidebar>*/}
                {/*    {!!selectedDates.length && (*/}
                {/*        <Card>*/}
                {/*            <CardBody as={VStack} gap={2} alignItems='flex-start'>*/}
                {/*                <Text>Take: {selectedDates.length} days</Text>*/}
                {/*                <Textarea placeholder='Reason...' size='sm' />*/}
                {/*            </CardBody>*/}
                {/*            <CardFooter as={HStack} gap={1}>*/}
                {/*                <Button size='full' isLoading={isPending} onClick={handleRequest}>*/}
                {/*                    Request*/}
                {/*                </Button>*/}
                {/*                <Button*/}
                {/*                    size='full'*/}
                {/*                    disabled={isPending}*/}
                {/*                    onClick={() => setSelectedDates([])}*/}
                {/*                >*/}
                {/*                    Clear*/}
                {/*                </Button>*/}
                {/*            </CardFooter>*/}
                {/*        </Card>*/}
                {/*    )}*/}

                {/*    <EditLeaveCard userId={userId} calendar={calendar} />*/}
                {/*</RightSidebar>*/}
            </Grid>
        </Container>
    );
}
