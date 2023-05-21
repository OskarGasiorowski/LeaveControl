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
    displayName: string;
    leaves: Leave[];
};

interface Props {
    userCalendars?: UserEntry[];
}

const userCalendarsDefault: UserEntry[] = [
    {
        displayName: 'John Smith',
        leaves: [
            {
                id: '1',
                reason: 'Holiday',
                dates: [new Date(2023, 4, 3), new Date(2023, 4, 4)],
            },
            {
                id: '2',
                reason: 'Sick leave',
                dates: [new Date(2023, 4, 12)],
            },
        ],
    },
    {
        displayName: 'Jane Doe',
        leaves: [
            {
                id: '3',
                reason: 'Personal time off',
                dates: [new Date(2023, 4, 9), new Date(2023, 4, 10)],
            },
        ],
    },
    {
        displayName: 'Robert Johnson',
        leaves: [
            {
                id: '4',
                reason: 'Family leave',
                dates: [new Date(2023, 4, 25), new Date(2023, 4, 26), new Date(2023, 4, 27)],
            },
        ],
    },
    {
        displayName: 'James Brown',
        leaves: [
            {
                id: '5',
                reason: 'Sick leave',
                dates: [new Date(2023, 4, 18)],
            },
            {
                id: '6',
                reason: 'Personal time off',
                dates: [new Date(2023, 4, 31)],
            },
        ],
    },
    {
        displayName: 'Emily Davis',
        leaves: [
            {
                id: '7',
                reason: 'Holiday',
                dates: [new Date(2023, 4, 14), new Date(2023, 4, 15), new Date(2023, 4, 16)],
            },
        ],
    },
    {
        displayName: 'Michael Miller',
        leaves: [
            {
                id: '8',
                reason: 'Personal time off',
                dates: [new Date(2023, 4, 21)],
            },
        ],
    },
    {
        displayName: 'Sarah Wilson',
        leaves: [
            {
                id: '9',
                reason: 'Family leave',
                dates: [new Date(2023, 4, 1), new Date(2023, 4, 2)],
            },
        ],
    },
    {
        displayName: 'David Moore',
        leaves: [
            {
                id: '10',
                reason: 'Sick leave',
                dates: [new Date(2023, 4, 30)],
            },
        ],
    },
    {
        displayName: 'Jessica Taylor',
        leaves: [
            {
                id: '11',
                reason: 'Holiday',
                dates: [new Date(2023, 4, 7), new Date(2023, 4, 8)],
            },
        ],
    },
    {
        displayName: 'Thomas Anderson',
        leaves: [
            {
                id: '12',
                reason: 'Personal time off',
                dates: [new Date(2023, 4, 20), new Date(2023, 4, 21), new Date(2023, 4, 22)],
            },
        ],
    },
];

export function CalendarOverview({ userCalendars = userCalendarsDefault }: Props) {
    const end = useMemo(() => dayjs().endOf('month'), []);
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
                            colorPalette={colorPalette}
                            key={displayName}
                            displayName={displayName}
                            leaves={leaves.map((leave) => ({
                                ...leave,
                                color: colorPalette.next(),
                            }))}
                        />
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}
