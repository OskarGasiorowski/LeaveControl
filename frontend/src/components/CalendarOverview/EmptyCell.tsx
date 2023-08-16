import { TableCell, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';

interface Props {
    isWeekend: boolean;
}

export function EmptyCell({ isWeekend }: Props) {
    const theme = useTheme();

    return (
        <TableCell
            sx={{
                borderRight: `1px dashed ${alpha(theme.palette.grey[500], 0.3)} !important`,
                paddingX: 1,
                backgroundColor: isWeekend ? 'rgba(228, 228, 228, 0.04)' : 'unset',
                ':last-child': { borderRightRadius: 4, border: 'none !important' },
            }}
        />
    );
}
