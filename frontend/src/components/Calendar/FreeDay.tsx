import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { selectedDatesAtom } from '#components';
import { Day } from './Day.tsx';
import { editModeAtom, leaveEditingAtom, selectedLeaveIdAtom } from './atom.ts';
import * as dayjs from 'dayjs';
import { useTheme } from '@mui/material';

interface Props {
    date: Date;
}

export function FreeDay({ date }: Props) {
    const theme = useTheme();
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

    const colorSet: Record<'free' | 'selected', { base: string; hover: string }> = {
        free: { base: theme.palette.grey[700], hover: theme.palette.grey[600] },
        selected: { base: theme.palette.secondary.main, hover: theme.palette.secondary.light },
    };
    const color = colorSet[dateIsSelected ? 'selected' : 'free'];

    return (
        <Day
            day={date.getDate()}
            color={color}
            onClick={() => (editMode ? handleDayEdit() : handleDayClick())}
        />
    );
}
