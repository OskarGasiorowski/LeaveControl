import { useParams } from 'react-router';
import { useUserCalendarOverview } from '#hooks';
import { Calendar } from '#components';
import { Container } from '@mui/material';

export function UserCalendarOverviewPage() {
    const { userId } = useParams<{ userId: string }>();

    const { calendar } = useUserCalendarOverview(userId);

    if (!userId) {
        // TODO not found page
        return <h1>not found</h1>;
    }

    if (!calendar) {
        return <h1>loading</h1>;
    }

    return (
        <Container maxWidth='xl'>
            <Calendar readonly calendar={calendar} />
        </Container>
    );
}
