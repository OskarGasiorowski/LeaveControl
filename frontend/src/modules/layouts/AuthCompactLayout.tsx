import { Box, Card } from '@mui/material';
import { ReactNode } from 'react';
import { AuthCompactOverlay } from '#illustrations';

interface Props {
    children: ReactNode;
}

export function AuthCompactLayout({ children }: Props) {
    return (
        <Box
            component='main'
            sx={{
                py: 12,
                display: 'flex',
                minHeight: '100vh',
                textAlign: 'center',
                px: { xs: 2, md: 0 },
                position: 'relative',
                alignItems: 'center',
                justifyContent: 'center',
                '&:before': {
                    width: 1,
                    height: 1,
                    zIndex: -1,
                    content: "''",
                    opacity: 0.24,
                    position: 'absolute',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    backgroundImage: `url(${AuthCompactOverlay})`,
                },
            }}
        >
            <Card
                sx={{
                    py: 5,
                    px: 3,
                    maxWidth: 420,
                }}
            >
                {children}
            </Card>
        </Box>
    );
}
