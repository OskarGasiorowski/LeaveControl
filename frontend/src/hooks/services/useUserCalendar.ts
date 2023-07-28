import { GetCalendarResponse, useApi } from '../api';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export function useUserCalendar(userId: string) {
    const queryClient = useQueryClient();
    const { getUserCalendar } = useApi();

    const { data } = useQuery({
        queryKey: ['calendar', userId],
        queryFn: () => getUserCalendar(userId),
        initialData: () => {
            return queryClient
                .getQueryData<GetCalendarResponse>(['calendar'])
                ?.find((c) => c.userId === userId);
        },
    });

    return {
        calendar: data,
    };
}
