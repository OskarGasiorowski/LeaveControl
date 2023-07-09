import { Box, Td } from '@chakra-ui/react';

interface Props {
    color: string;
    variant: 'left' | 'center' | 'right' | 'single';
    isWeekend: boolean;
}

export function LeaveCell({ color, variant, isWeekend }: Props) {
    const variants: Record<
        typeof variant,
        { borderStartRadius: 'lg' | 'unset'; borderEndRadius: 'lg' | 'unset' }
    > = {
        center: { borderStartRadius: 'unset', borderEndRadius: 'unset' },
        right: { borderStartRadius: 'unset', borderEndRadius: 'lg' },
        single: { borderStartRadius: 'lg', borderEndRadius: 'lg' },
        left: { borderStartRadius: 'lg', borderEndRadius: 'unset' },
    };

    return (
        <Td
            borderRight='1px solid rgba(228, 228, 228, 0.04)'
            _last={{ borderEndRadius: 'lg', paddingRight: 2, border: 'none' }}
            paddingX={0}
            paddingY={0}
            paddingLeft={variant === 'left' || variant === 'single' ? 1 : 0}
            paddingRight={variant === 'right' || variant === 'single' ? 1 : 0}
            backgroundColor={isWeekend ? 'rgba(228, 228, 228, 0.04)' : 'unset'}
        >
            <Box
                {...variants[variant]}
                backgroundColor={color}
                width='calc(100% + 1px)'
                height={5}
            />
        </Td>
    );
}
