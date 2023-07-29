import { Month } from './Month.tsx';
import { times } from 'lodash';
import { Flex, Spacer, VStack, Heading, HStack, Button } from '@chakra-ui/react';
import { Fragment, useState } from 'react';
import { GetUserCalendarResponse } from '../../hooks/api';
import * as dayjs from 'dayjs';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

interface Props {
    calendar: GetUserCalendarResponse;
}

export function Calendar({ calendar }: Props) {
    const [year, setYear] = useState(dayjs(Date.now()).year());

    return (
        <VStack gap={3}>
            <HStack>
                <Button
                    variant='ghost'
                    leftIcon={<ChevronLeftIcon />}
                    onClick={() => setYear((prev) => prev - 1)}
                />
                <Heading size='md'>{year}</Heading>
                <Button
                    variant='ghost'
                    leftIcon={<ChevronRightIcon />}
                    onClick={() => setYear((prev) => prev + 1)}
                />
            </HStack>
            <Flex height='full' flexWrap='wrap' rowGap={8}>
                {times(12).map((month) => (
                    <Fragment key={month}>
                        <Month month={month} year={year} calendar={calendar} />
                        <Spacer />
                    </Fragment>
                ))}
            </Flex>
        </VStack>
    );
}
