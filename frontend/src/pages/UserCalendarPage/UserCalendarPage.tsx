import { Calendar } from '#components';
import { useParams } from 'react-router';
import { useUserCalendar } from '#hooks';
import { Container, Grid } from '@mui/material';
import { AddLeaveCard, EditLeaveCard } from './components';

export function UserCalendarPage() {
    const { userId } = useParams<{ userId: string }>();

    const { calendar } = useUserCalendar(userId);

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
                    <AddLeaveCard userId={userId} />
                    <EditLeaveCard userId={userId} calendar={calendar} />
                </Grid>
            </Grid>
        </Container>
    );
}
