import { Calendar, Chart } from '#components';
import { useParams } from 'react-router';
import { useChart, useUserCalendar } from '#hooks';
import { Card, Container, Grid, Stack, Typography, useTheme } from '@mui/material';
import { AddLeaveCard, EditLeaveCard } from './components';

export function UserCalendarPage() {
    const theme = useTheme();
    const { userId } = useParams<{ userId: string }>();

    const { calendar } = useUserCalendar(userId);

    const chartOptions = useChart({
        legend: {
            show: false,
        },
        grid: {
            padding: { top: -32, bottom: -32 },
        },
        fill: {
            type: 'gradient',
            gradient: {
                colorStops: [
                    { offset: 0, color: theme.palette.primary.light },
                    { offset: 100, color: theme.palette.primary.main },
                ],
            },
        },
        plotOptions: {
            radialBar: {
                hollow: { size: '64%' },
                dataLabels: {
                    name: { offsetY: -16 },
                    value: { offsetY: 8 },
                    total: {
                        label: 'Leaves',
                        formatter: (value) => {
                            console.log(value);
                            return 'value';
                        },
                    },
                    show: false,
                },
            },
        },
    });

    if (!userId) {
        // TODO not found page
        return <h1>not found</h1>;
    }

    if (!calendar) {
        return <h1>loading</h1>;
    }

    return (
        <Container maxWidth='xl'>
            <Grid container columnSpacing={3}>
                <Grid xs={12} md={8} lg={9}>
                    <Calendar calendar={calendar} />
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <Stack rowGap={4} sx={{ position: 'sticky', top: 0 }}>
                        <AddLeaveCard userId={userId} />
                        <EditLeaveCard userId={userId} calendar={calendar} />
                        <Card sx={{ p: 3 }}>
                            <Typography
                                sx={{ marginBottom: -0.5 }}
                                variant='subtitle2'
                                gutterBottom
                            >
                                Overview
                            </Typography>
                            <Typography variant='h3' sx={{ mb: 2 }}>
                                {calendar.firstName} {calendar.surname}
                            </Typography>

                            <Chart
                                type='radialBar'
                                series={[
                                    ((calendar?.deductibleLeaveDaysCount || 0) /
                                        calendar?.allowance) *
                                        100,
                                ]}
                                options={chartOptions}
                                height={310}
                            />
                            <Stack
                                gap={1}
                                alignItems='center'
                                sx={{ position: 'absolute', bottom: '100px', left: '130px' }}
                            >
                                <Typography variant='overline' color='text.secondary'>
                                    Leaves
                                </Typography>
                                <Typography variant='h4'>
                                    {calendar.deductibleLeaveDaysCount} / {calendar.allowance}
                                </Typography>
                            </Stack>
                        </Card>
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    );
}
