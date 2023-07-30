import { useApi } from '../api';
import { useQuery } from '@tanstack/react-query';

export function useUserCalendar(userId?: string) {
    const { getUserCalendar } = useApi();

    const { data } = useQuery({
        queryKey: ['calendar', userId],
        queryFn: () => getUserCalendar(userId!),
    });

    return {
        calendar: data,
    };
}
