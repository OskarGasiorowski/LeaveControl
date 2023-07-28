import { Day } from './Day.tsx';
import { noop } from 'lodash';
import { selectedDatesAtom } from '#components';
import { useAtomValue } from 'jotai';

interface Props {
    day: number;
    month: number;
}

export function TakenDay({ day }: Props) {
    const selectedDates = useAtomValue(selectedDatesAtom);

    return (
        <Day
            day={day}
            onClick={noop}
            color={{ base: '#7FBA7A', hover: '#A0D7E7' }}
            disabled={selectedDates.length > 0}
        />
    );
}
