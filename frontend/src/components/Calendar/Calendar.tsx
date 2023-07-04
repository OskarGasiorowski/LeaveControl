import { Month } from './Month.tsx';
import { times } from 'lodash';
import { Flex, Spacer } from '@chakra-ui/react';
import { Fragment } from 'react';

export function Calendar() {
    return (
        <Flex height='full' flexWrap='wrap' rowGap={8}>
            {times(12).map((month) => (
                <Fragment key={month}>
                    <Month month={month} />
                    <Spacer />
                </Fragment>
            ))}
        </Flex>
    );
}
