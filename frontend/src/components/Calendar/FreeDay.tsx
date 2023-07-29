import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { selectedDatesAtom } from '#components';
import { Day } from './Day.tsx';
import { editModeAtom, leaveEditingAtom, selectedLeaveIdAtom } from './atom.ts';

interface Props {
    day: number;
    month: number;
}

const colorSet: Record<'free' | 'selected', { base: string; hover: string }> = {
    free: { base: 'gray.800', hover: 'gray.600' },
    selected: { base: 'primary.300', hover: 'primary.200' },
};

export function FreeDay({ day, month }: Props) {
    const [selectedDates, setSelectedDates] = useAtom(selectedDatesAtom);
    const setLeaveEditing = useSetAtom(leaveEditingAtom);
    const setSelectedLeaveIdAtom = useSetAtom(selectedLeaveIdAtom);
    const editMode = useAtomValue(editModeAtom);

    function handleDayClick() {
        if (!editMode) {
            setSelectedLeaveIdAtom(null);
        }

        const dateIsSelected = selectedDates.some(
            (date) => date.getMonth() === month && date.getDate() === day,
        );

        if (!dateIsSelected) {
            setSelectedDates((prev) => [...prev, new Date(2023, month, day)]);
            return;
        }

        setSelectedDates((prev) =>
            prev.filter((date) => !(date.getMonth() === month && date.getDate() === day)),
        );
    }

    function handleDayEdit() {
        setLeaveEditing((prev) => {
            if (prev === null) {
                return null;
            }

            return {
                ...prev,
                leaveDays: [...prev.leaveDays, { day: new Date(2023, month, day), type: 'Full' }],
            };
        });
    }

    const dateIsSelected = selectedDates.some(
        (date) => date.getMonth() === month && date.getDate() === day,
    );
    const color = colorSet[dateIsSelected ? 'selected' : 'free'];

    return (
        <Day
            day={day}
            color={color}
            onClick={() => (editMode ? handleDayEdit() : handleDayClick())}
        />
    );
}
