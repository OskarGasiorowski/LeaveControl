import { Box, Td, Tr } from '@chakra-ui/react';
import { Leave } from './CalendarOverview';
import { useMemo } from 'react';
import { RoundRobin } from '#utils';

interface Props {
    displayName: string;
    leaves: (Leave & { color: string })[];
    colorPalette: RoundRobin<string>;
}

export function Row({ displayName, leaves }: Props) {
    const calendar = useMemo(() => {
        const temp = new Array<{
            id: string;
            variant: 'left' | 'center' | 'right' | 'single';
        } | null>(31).fill(null);

        leaves.forEach((leave) =>
            leave.dates.forEach((date) => {
                temp[date.getDate() - 1] = {
                    id: leave.id,
                    variant: 'center',
                };
            }),
        );

        let lastId: string | null = null;

        for (let i = 0; i < temp.length; i++) {
            if (temp[i] === null) {
                lastId = null;
                continue;
            }

            if (i >= temp.length) {
                continue;
            }

            const nextTheSame = temp[i]!.id === temp[i + 1]?.id;

            if (lastId !== temp[i]!.id) {
                lastId = temp[i]!.id;
                temp[i]!.variant = nextTheSame ? 'left' : 'single';
                continue;
            }

            if (lastId === temp[i]!.id && !nextTheSame) {
                temp[i]!.variant = 'right';
            }
        }

        return temp;
    }, [leaves]);

    return (
        <Tr _hover={{ backgroundColor: 'backgroundHoover' }} key={displayName}>
            <Td borderStartRadius='lg' paddingY={3} paddingLeft={2} fontSize='sm'>
                {displayName}
            </Td>
            {calendar.map((type) => (
                <>
                    {!type && <EmptyCell />}
                    {!!type && (
                        <LeaveCell
                            color={leaves.find((leave) => leave.id === type?.id)!.color}
                            variant={type!.variant}
                        />
                    )}
                </>
            ))}
        </Tr>
    );
}

function EmptyCell() {
    return (
        <Td
            borderRight='1px solid rgba(228, 228, 228, 0.04)'
            _last={{ borderEndRadius: 'lg', border: 'none' }}
            paddingX={1}
        />
    );
}

function LeaveCell({
    color,
    variant,
}: {
    color: string;
    variant: 'left' | 'center' | 'right' | 'single';
}) {
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
            paddingLeft={variant === 'left' ? 1 : 0}
            paddingRight={variant === 'right' ? 1 : 0}
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
