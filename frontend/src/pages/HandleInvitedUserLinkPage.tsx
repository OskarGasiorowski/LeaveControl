import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { AuthCompactLayout } from '#modules/layouts';
import { CircularProgress } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { usePaths } from '#hooks';
import { useAuth } from '#modules/auth';
import { decodeToken } from '#utils';

export function HandleInvitedUserLinkPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const paths = usePaths();
    const auth = useAuth();

    useEffect(() => {
        const jwt = searchParams.get('value');
        if (!jwt) {
            navigate(paths.login);
            return;
        }

        const { role } = decodeToken(jwt);
        if (role !== 'InvitedUser') {
            navigate(paths.login);
            return;
        }

        auth.setToken(jwt);
        navigate(paths.setupInvitedUser, { replace: true });
    }, []);

    return (
        <AuthCompactLayout>
            <CircularProgress />
        </AuthCompactLayout>
    );
}
