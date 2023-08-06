import { useApi } from '../api';
import { useQuery } from '@tanstack/react-query';

export function usePendingRequests() {
    const { getPendingRequests } = useApi();

    const { data = [] } = useQuery({
        queryKey: ['pending-requests'],
        queryFn: getPendingRequests,
    });

    return {
        pendingRequests: data,
    };
}
