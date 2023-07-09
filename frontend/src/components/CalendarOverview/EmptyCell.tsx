import { Td } from '@chakra-ui/react';

interface Props {
    isWeekend: boolean;
}

export function EmptyCell({ isWeekend }: Props) {
    return (
        <Td
            borderRight='1px solid rgba(228, 228, 228, 0.04)'
            _last={{ borderEndRadius: 'lg', border: 'none' }}
            paddingX={1}
            backgroundColor={isWeekend ? 'rgba(228, 228, 228, 0.04)' : 'unset'}
        />
    );
}
