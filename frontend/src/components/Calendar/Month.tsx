import { Grid, GridItem, Text } from '@chakra-ui/react';
import * as dayjs from 'dayjs';
import { times } from 'lodash';

interface Props {
    month: number;
}

export function Month({ month }: Props) {
    const firstDay = dayjs(new Date(2023, month, 1));
    const emptyDays = firstDay.day() === 0 ? 6 : firstDay.day() - 1;
    const daysOfWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

    return (
        <Grid templateColumns='repeat(7, 1fr)' justifyItems='center' gap={0} rowGap={1.5}>
            {daysOfWeek.map((day) => (
                <GridItem
                    key={day}
                    width='full'
                    paddingX={1}
                    paddingY={1}
                    borderBottom='1px solid white'
                    marginBottom={1}
                    height='fit-content'
                >
                    <Text fontSize='xs' textAlign='center'>
                        {day}
                    </Text>
                </GridItem>
            ))}

            {times(emptyDays).map((index) => (
                <GridItem key={`empty-${index}`} />
            ))}

            {times(firstDay.daysInMonth()).map((day) => (
                <GridItem
                    key={day}
                    backgroundColor='gray.800'
                    width={8}
                    height={7}
                    textAlign='center'
                    alignItems='center'
                    _hover={{ backgroundColor: 'gray.600', cursor: 'pointer' }}
                >
                    <Text as='span' fontSize='xs' textAlign='center'>
                        {day + 1}
                    </Text>
                </GridItem>
            ))}
        </Grid>
    );
}
