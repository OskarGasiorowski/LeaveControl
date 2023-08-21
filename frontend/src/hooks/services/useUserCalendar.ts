import { GetCalendarResponse, useApi } from '../api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';

export function useUserCalendar(userId?: string) {
    const queryClient = useQueryClient();
    const { getUserCalendar } = useApi();

    const { data } = useQuery({
        queryKey: ['calendar', userId],
        queryFn: () => getUserCalendar(userId!),
        initialData: () => {
            const defaultData = queryClient
                .getQueryData<GetCalendarResponse>(['calendar'])
                ?.find((c) => c.userId === userId);

            if (!defaultData) return undefined;

            return { ...defaultData, allowance: 0 };
        },
        enabled: !!userId,
    });

    const deductibleLeaveDaysCount = useMemo(
        () => data?.leaves.flatMap((l) => l.leaveDays).length || 0,
        [data],
    );

    const calendar = useMemo(
        () => (!data ? undefined : { ...data, deductibleLeaveDaysCount }),
        [data, deductibleLeaveDaysCount],
    );
    console.log(deductibleLeaveDaysCount);

    return {
        calendar,
    };
}
