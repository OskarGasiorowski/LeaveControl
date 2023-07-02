import { useApi } from '../api';
import { useQuery } from '@tanstack/react-query';

export function useCalendar() {
    const { getCalendar } = useApi();

    const { data = [] } = useQuery(['calendar'], getCalendar);

    return {
        calendar: data,
    };
}
