import { Day } from './Day.tsx';
import { noop } from 'lodash';
import { selectedDatesAtom } from '#components';
import { useAtom, useAtomValue } from 'jotai';
import { hoverLeaveIdAtom } from './atom.ts';

interface Props {
    day: number;
    month: number;
    leaveId: string;
}

export function TakenDay({ day, leaveId }: Props) {
    const selectedDates = useAtomValue(selectedDatesAtom);
    const [hoverLeaveId, setLeaveId] = useAtom(hoverLeaveIdAtom);

    return (
        <Day
            day={day}
            onClick={noop}
            color={{ base: '#7FBA7A', hover: '#A0D7E7' }}
            disabled={selectedDates.length > 0}
            onMouseOver={() => setLeaveId(leaveId)}
            onMouseOut={() => setLeaveId(null)}
            highlighted={hoverLeaveId === leaveId}
        />
    );
}
