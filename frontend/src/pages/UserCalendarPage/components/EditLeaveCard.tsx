import { Button, Card, CardBody, CardFooter, Text, Textarea, VStack } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import {
    editModeAtom,
    leaveEditingAtom,
    selectedLeaveIdAtom,
} from '../../../components/Calendar/atom.ts';
import { GetUserCalendarResponse } from '../../../hooks/api';
import { useUpdateLeaveRequest } from '#hooks';
import { useDeleteLeaveRequest } from '../../../hooks/services/useDeleteLeaveRequest.ts';

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

    return (
        <Card>
            <CardBody as={VStack} gap={2} alignItems='flex-start'>
                <Text>Taken: {selectedLeave.leaveDays.length} days</Text>
                <Textarea placeholder='Reason...' size='sm' />
            </CardBody>
            <CardFooter as={VStack} gap={1}>
                {!editMode && (
                    <Button size='full' onClick={handleEdit}>
                        Edit
                    </Button>
                )}
                {editMode && (
                    <>
                        <Button
                            disabled={isDeletePending || isPending}
                            size='full'
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            isLoading={isPending}
                            disabled={isDeletePending}
                            size='full'
                            onClick={handleUpdate}
                        >
                            Save
                        </Button>
                        <Button
                            isLoading={isDeletePending}
                            disabled={isPending}
                            size='full'
                            onClick={() => deleteLeave(selectedLeaveId!)}
                        >
                            Delete
                        </Button>
                    </>
                )}
            </CardFooter>
        </Card>
    );
}
