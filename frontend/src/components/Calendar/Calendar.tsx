import { Month } from './Month.tsx';
import { times } from 'lodash';
import { Flex, Spacer } from '@chakra-ui/react';
import { Fragment } from 'react';
import { useUserCalendar } from '#hooks';

interface Props {
    userId: string;
}

export function Calendar({ userId }: Props) {
    const { calendar } = useUserCalendar(userId);

    // TODO proper loading with skeleton
    if (!calendar) {
        return <h1>Loading</h1>;
    }

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
