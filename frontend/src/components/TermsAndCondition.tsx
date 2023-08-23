import { Link } from './Link.tsx';
import { Typography } from '@mui/material';
import { usePaths } from '#hooks';

export function TermsAndCondition() {
    const paths = usePaths();

    return (
        <Typography
            component='div'
            sx={{
                color: 'text.secondary',
                typography: 'caption',
                textAlign: 'center',
            }}
        >
            {'By signing up, I agree to '}
            <Link to={paths.createAccount} underline='always' color='text.primary'>
                Terms of Service
            </Link>
            {' and '}
            <Link to={paths.createAccount} underline='always' color='text.primary'>
                Privacy Policy
            </Link>
            .
        </Typography>
    )
}