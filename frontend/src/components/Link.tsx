import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

export function Link(props: Omit<RouterLinkProps, 'as'> & Omit<MuiLinkProps, 'component'>) {
    return <MuiLink component={RouterLink} {...props} />;
}
