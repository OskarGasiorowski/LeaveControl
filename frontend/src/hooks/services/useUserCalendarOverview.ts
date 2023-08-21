import { GetCalendarResponse, useApi } from '../api';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export function useUserCalendarOverview(userId?: string) {
    const queryClient = useQueryClient();
    const { getUserCalendarOverview } = useApi();

    const { data } = useQuery({
        queryKey: ['calendar', userId],
        queryFn: () => getUserCalendarOverview(userId!),
        initialData: () => {
            const defaultData = queryClient
                .getQueryData<GetCalendarResponse>(['calendar'])
                ?.find((c) => c.userId === userId);

            if (!defaultData) return undefined;

            return { ...defaultData, allowance: 0 };
        },
        enabled: !!userId,
    });

    return {
        calendar: data,
    };
}
