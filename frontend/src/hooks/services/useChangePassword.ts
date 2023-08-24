import { useApi } from '../api';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '#modules/auth';

export function useChangePassword(onSuccess?: () => void) {
    const { changePassword } = useApi();
    const auth = useAuth();

    const { mutate, isPending } = useMutation({
        mutationKey: ['change-password'],
        mutationFn: changePassword,
        onSuccess: (data) => {
            auth.setToken(data);
            onSuccess?.();
        },
    });

    return {
        changePassword: mutate,
        isChangePasswordPending: isPending,
    };
}
