import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import * as dayjs from 'dayjs';
import { useMemo } from 'react';
import { times } from 'lodash';
import { Row } from './Row';
import { RoundRobin } from '#utils';

export type Leave = {
    id: string;
    reason: string;
    dates: Date[];
};

type UserEntry = {
    userId: string;
    displayName: string;
    leaves: Leave[];
};

interface Props {
    userCalendars: UserEntry[];
    month: dayjs.Dayjs;
}

export function CalendarOverview({ userCalendars, month }: Props) {
    const end = useMemo(() => dayjs(month).endOf('month'), [month]);
    const colorPalette = useMemo(
        () =>
            new RoundRobin([
                '#FFA2C0',
                '#A0D7E7',
                '#CFC8FF',
                '#3F8CFF',
                '#6C5DD3',
                '#FFCE73',
                '#7FBA7A',
                '#FF754C',
            ]),
        [],
    );

    return (
        <TableContainer>
            <Table variant='unstyled' layout='fixed'>
                <Thead>
                    <Tr>
                        <Th paddingLeft={2} width={40}>
                            Users
                        </Th>
                        {times(end.date()).map((day) => (
                            <Th textAlign='center' paddingX={1} key={day}>
                                {day + 1}
                            </Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody>
                    {userCalendars?.map(({ displayName, leaves }) => (
                        <Row
                            key={displayName}
                            displayName={displayName}
                            leaves={leaves.map((leave) => ({
                                ...leave,
                                color: colorPalette.next(),
                            }))}
                            month={month}
                        />
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}
