import { Leave } from './CalendarOverview';
import { Fragment, useMemo } from 'react';
import * as dayjs from 'dayjs';
import { LeaveCell } from './LeaveCell';
import { EmptyCell } from './EmptyCell';
import { TableCell, TableRow, Typography } from '@mui/material';

interface Props {
    displayName: string;
    leaves: (Leave & { color: string })[];
    month: dayjs.Dayjs;
    onClick: () => void;
}

export function Row({ displayName, leaves, month, onClick }: Props) {
    const calendar = useMemo(() => {
        const temp = new Array<{
            id: string;
            variant: 'left' | 'center' | 'right' | 'single';
        } | null>(dayjs(month).endOf('month').date()).fill(null);

        leaves.forEach((leave) =>
            leave.leaveDays.forEach((date) => {
                if (dayjs(new Date(date.day)).isSame(dayjs(month), 'month')) {
                    temp[new Date(date.day).getDate() - 1] = {
                        id: leave.id,
                        variant: 'center',
                    };
                }
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
    }, [leaves, month]);

    return (
        <TableRow hover sx={{ cursor: 'pointer' }} onClick={onClick}>
            <TableCell
                sx={{
                    borderStartStartRadius: 4,
                    borderBottomLeftRadius: 4,
                    paddingY: 1,
                    paddingLeft: 2,
                    width: '100px',
                }}
            >
                <Typography typography='body2' noWrap>
                    {displayName}
                </Typography>
            </TableCell>
            {calendar.map((type, index) => {
                const day = dayjs(new Date(month.year(), month.month(), index + 1)).day();
                const isWeekend = day === 0 || day === 6;
                return (
                    <Fragment key={index + 'empty'}>
                        {!type && <EmptyCell isWeekend={isWeekend} />}
                        {!!type && (
                            <LeaveCell
                                color={leaves.find((leave) => leave.id === type?.id)!.color}
                                variant={type!.variant}
                                isWeekend={isWeekend}
                            />
                        )}
                    </Fragment>
                );
            })}
        </TableRow>
    );
}
