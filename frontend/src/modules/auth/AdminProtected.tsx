import { useAuth } from '#modules/auth/useAuth.ts';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

export function AdminProtected({ children }: Props) {
    const { role } = useAuth();

    if (role === 'Admin') {
        return <>{children}</>;
    }

    return null;
}
