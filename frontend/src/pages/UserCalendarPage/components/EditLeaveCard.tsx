import { useAtom } from 'jotai';
import {
    editModeAtom,
    leaveEditingAtom,
    selectedLeaveIdAtom,
} from '../../../components/Calendar/atom.ts';
import { GetUserCalendarResponse } from '../../../hooks/api';
import { useUpdateLeaveRequest } from '#hooks';
import { useDeleteLeaveRequest } from '../../../hooks/services/useDeleteLeaveRequest.ts';
import { Button, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { LeaveCard } from './LeaveCard.tsx';

interface Props {
    userId: string;
    calendar: GetUserCalendarResponse;
}

export function EditLeaveCard({ calendar, userId }: Props) {
    const [editMode, setEditMode] = useAtom(editModeAtom);
    const [leaveEditing, setLeaveEditing] = useAtom(leaveEditingAtom);
    const [selectedLeaveId, setSelectedLeaveId] = useAtom(selectedLeaveIdAtom);

    const selectedLeave = calendar?.leaves.find((leave) => leave.id === selectedLeaveId);

    const { request, isPending } = useUpdateLeaveRequest(userId, selectedLeaveId, () => {
        setEditMode(false);
    });

    const { deleteLeave, isPending: isDeletePending } = useDeleteLeaveRequest(userId, () => {
        setEditMode(false);
        setSelectedLeaveId(null);
        setLeaveEditing(null);
    });

    function handleEdit() {
        setLeaveEditing(calendar?.leaves.find((leave) => leave.id === selectedLeaveId) || null);
        setEditMode(true);
    }

    function handleCancel() {
        setEditMode(false);
        setLeaveEditing(null);
    }

    if (!selectedLeave) {
        return null;
    }

    function handleUpdate() {
        request({
            entry:
                leaveEditing?.leaveDays.map((leave) => ({
                    date: leave.day,
                    type: 'Full',
                })) || [],
            reason: '',
        });
    }

    const overview = (
        <Button variant='contained' fullWidth onClick={handleEdit}>
            Edit
        </Button>
    );

    const editButtons = (
        <>
            <Stack direction='row' spacing={1.5}>
                <Button disabled={isPending} fullWidth variant='contained' onClick={handleCancel}>
                    Cancel
                </Button>
                <LoadingButton
                    loading={isPending}
                    disabled={isDeletePending}
                    fullWidth
                    variant='contained'
                    color='primary'
                    onClick={handleUpdate}
                >
                    Save
                </LoadingButton>
            </Stack>
            <LoadingButton
                loading={isDeletePending}
                disabled={isPending}
                fullWidth
                variant='contained'
                color='error'
                onClick={() => deleteLeave(selectedLeaveId!)}
            >
                Delete
            </LoadingButton>
        </>
    );

    return (
        <LeaveCard
            title='Book a leave'
            days={selectedLeave.leaveDays.length}
            reason={selectedLeave.reason}
            onReasonChange={(reason) => setLeaveEditing({ ...selectedLeave, reason })}
            actions={editMode ? editButtons : overview}
        />
    );
}
