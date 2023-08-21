import { useQuery, useQueryClient } from '@tanstack/react-query';
import { GetCalendarResponse, useApi } from '../api';
import { useMemo } from 'react';
import { useAuth } from '#modules/auth';

export function useUserCalendar() {
    const queryClient = useQueryClient();
    const { getMyCalendar } = useApi();
    const { userId } = useAuth();

    const { data } = useQuery({
        queryKey: ['calendar', 'me'],
        queryFn: () => getMyCalendar(),
        initialData: () => {
            const defaultData = queryClient
                .getQueryData<GetCalendarResponse>(['calendar'])
                ?.find((c) => c.userId === userId);

            if (!defaultData) return undefined;

            return { ...defaultData, allowance: 0 };
        },
    });

    const deductibleLeaveDaysCount = useMemo(
        () => data?.leaves.flatMap((l) => l.leaveDays).length || 0,
        [data],
    );

    const calendar = useMemo(
        () => (!data ? undefined : { ...data, deductibleLeaveDaysCount }),
        [data, deductibleLeaveDaysCount],
    );

    return {
        calendar,
    };
}
