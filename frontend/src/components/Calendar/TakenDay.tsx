import { Day } from './Day.tsx';
import { selectedDatesAtom } from '#components';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { editModeAtom, hoverLeaveIdAtom, leaveEditingAtom, selectedLeaveIdAtom } from './atom.ts';
import * as dayjs from 'dayjs';

interface Props {
    date: Date;
    leaveId: string;
}

export function TakenDay({ date, leaveId }: Props) {
    const selectedDates = useAtomValue(selectedDatesAtom);
    const [hoverLeaveId, setLeaveId] = useAtom(hoverLeaveIdAtom);
    const [selectedLeaveId, setSelectedLeaveIdAtom] = useAtom(selectedLeaveIdAtom);
    const setLeaveEditing = useSetAtom(leaveEditingAtom);
    const editMode = useAtomValue(editModeAtom);

    function handleDayEdit() {
        setLeaveEditing((prev) => {
            if (prev === null) {
                return null;
            }

            return {
                ...prev,
                leaveDays: prev.leaveDays.filter(
                    ({ day: leaveDay }) => !dayjs(leaveDay).isSame(date, 'date'),
                ),
            };
        });
    }

    return (
        <Day
            day={date.getDate()}
            onClick={() => (editMode ? handleDayEdit() : setSelectedLeaveIdAtom(leaveId))}
            color={{ base: '#7FBA7A', hover: '#A0D7E7' }}
            disabled={selectedDates.length > 0 || (editMode && selectedLeaveId !== leaveId)}
            onMouseOver={() => setLeaveId(leaveId)}
            onMouseOut={() => setLeaveId(null)}
            highlighted={hoverLeaveId === leaveId || selectedLeaveId === leaveId}
        />
    );
}
