import { useCalendar } from '#hooks';
import { CalendarOverview } from '#components';

export function DashboardPage() {
    useCalendar();

    return (
        <div>
            <CalendarOverview />
        </div>
    );
}
