import { useQuery } from '@tanstack/react-query';
import { useApi } from '../api';

export function useUsers() {
    const { getUsers } = useApi();
    const { data, isLoading } = useQuery(['users'], getUsers);

    return {
        users: data,
        isLoading,
    };
}
