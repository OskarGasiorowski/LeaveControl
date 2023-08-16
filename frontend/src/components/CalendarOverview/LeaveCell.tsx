import { Box, TableCell, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';

interface Props {
    color: string;
    variant: 'left' | 'center' | 'right' | 'single';
    isWeekend: boolean;
}

export function LeaveCell({ color, variant, isWeekend }: Props) {
    const theme = useTheme();

    const variants: Record<typeof variant, { borderRadius: string | 'unset' }> = {
        center: { borderRadius: 'unset' },
        right: { borderRadius: '0px 4px 4px 0px' },
        single: { borderRadius: '4px 4px 4px 4px' },
        left: { borderRadius: '4px 0px 0px 4px' },
    };

    return (
        <TableCell
            sx={{
                borderRight: `1px dashed ${alpha(theme.palette.grey[500], 0.3)} !important`,
                padding: 0,
                paddingLeft: variant === 'left' || variant === 'single' ? 1 : 0,
                paddingRight: variant === 'right' || variant === 'single' ? 1 : 0,
                backgroundColor: isWeekend ? 'rgba(228, 228, 228, 0.04)' : 'unset',
                ':last-child': { border: 'none !important' },
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    zIndex: 100,
                    backgroundColor: color,
                    ...variants[variant],
                }}
                width='calc(100% + 1px)'
                height={18}
            />
        </TableCell>
    );
}
