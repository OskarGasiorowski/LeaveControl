import { Day } from './Day.tsx';
import { selectedDatesAtom } from '#components';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { editModeAtom, hoverLeaveIdAtom, leaveEditingAtom, selectedLeaveIdAtom } from './atom.ts';
import * as dayjs from 'dayjs';
import { useTheme } from '@mui/material';

interface Props {
    date: Date;
    leaveId: string;
    isPending: boolean;
}

export function TakenDay({ date, leaveId, isPending }: Props) {
    const theme = useTheme();

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

    const color = isPending
        ? { base: theme.palette.warning.main, hover: theme.palette.warning.dark }
        : { base: theme.palette.primary.main, hover: theme.palette.primary.dark };

    return (
        <Day
            day={date.getDate()}
            onClick={() => (editMode ? handleDayEdit() : setSelectedLeaveIdAtom(leaveId))}
            color={color}
            disabled={selectedDates.length > 0 || (editMode && selectedLeaveId !== leaveId)}
            onMouseOver={() => setLeaveId(leaveId)}
            onMouseOut={() => setLeaveId(null)}
            highlighted={hoverLeaveId === leaveId || selectedLeaveId === leaveId}
        />
    );
}
