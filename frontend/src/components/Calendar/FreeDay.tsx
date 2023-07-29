import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { selectedDatesAtom } from '#components';
import { Day } from './Day.tsx';
import { editModeAtom, leaveEditingAtom, selectedLeaveIdAtom } from './atom.ts';
import * as dayjs from 'dayjs';

interface Props {
    date: Date;
}

const colorSet: Record<'free' | 'selected', { base: string; hover: string }> = {
    free: { base: 'gray.800', hover: 'gray.600' },
    selected: { base: 'primary.300', hover: 'primary.200' },
};

export function FreeDay({ date }: Props) {
    const [selectedDates, setSelectedDates] = useAtom(selectedDatesAtom);
    const setLeaveEditing = useSetAtom(leaveEditingAtom);
    const setSelectedLeaveIdAtom = useSetAtom(selectedLeaveIdAtom);
    const editMode = useAtomValue(editModeAtom);

    function handleDayClick() {
        if (!editMode) {
            setSelectedLeaveIdAtom(null);
        }

        const dateIsSelected = selectedDates.some((selectedDate) =>
            dayjs(selectedDate).isSame(date, 'date'),
        );

        if (!dateIsSelected) {
            setSelectedDates((prev) => [...prev, date]);
            return;
        }

        setSelectedDates((prev) =>
            prev.filter((selectedDate) => !dayjs(selectedDate).isSame(date, 'date')),
        );
    }

    function handleDayEdit() {
        setLeaveEditing((prev) => {
            if (prev === null) {
                return null;
            }

            return {
                ...prev,
                leaveDays: [...prev.leaveDays, { day: date, type: 'Full' }],
            };
        });
    }

    const dateIsSelected = selectedDates.some((selectedDate) =>
        dayjs(selectedDate).isSame(date, 'date'),
    );
    const color = colorSet[dateIsSelected ? 'selected' : 'free'];

    return (
        <Day
            day={date.getDate()}
            color={color}
            onClick={() => (editMode ? handleDayEdit() : handleDayClick())}
        />
    );
}
