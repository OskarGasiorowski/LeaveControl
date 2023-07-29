import { Month } from './Month.tsx';
import { times } from 'lodash';
import { Flex, Spacer } from '@chakra-ui/react';
import { Fragment } from 'react';
import { GetUserCalendarResponse } from '../../hooks/api';

interface Props {
    calendar: GetUserCalendarResponse;
}

export function Calendar({ calendar }: Props) {
    return (
        <Flex height='full' flexWrap='wrap' rowGap={8}>
            {times(12).map((month) => (
                <Fragment key={month}>
                    <Month month={month} calendar={calendar} />
                    <Spacer />
                </Fragment>
            ))}
        </Flex>
    );
}
