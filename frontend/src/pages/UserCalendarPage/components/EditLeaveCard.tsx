import {
    Button,
    Card,
    CardBody,
    CardFooter,
    HStack,
    Text,
    Textarea,
    VStack,
} from '@chakra-ui/react';
import { useAtom } from 'jotai';
import {
    editModeAtom,
    leaveEditingAtom,
    selectedLeaveIdAtom,
} from '../../../components/Calendar/atom.ts';
import { GetUserCalendarResponse } from '../../../hooks/api';
import { useUpdateLeaveRequest } from '#hooks';

interface Props {
    userId: string;
    calendar: GetUserCalendarResponse;
}

export function EditLeaveCard({ calendar, userId }: Props) {
    const [editMode, setEditMode] = useAtom(editModeAtom);
    const [leaveEditing, setLeaveEditing] = useAtom(leaveEditingAtom);
    const [selectedLeaveId] = useAtom(selectedLeaveIdAtom);

    const selectedLeave = calendar?.leaves.find((leave) => leave.id === selectedLeaveId);

    const { request, isPending } = useUpdateLeaveRequest(userId, selectedLeaveId, () => {
        setEditMode(false);
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
            <CardFooter as={HStack} gap={1}>
                {!editMode && (
                    <Button size='full' onClick={handleEdit}>
                        Edit
                    </Button>
                )}
                {editMode && (
                    <>
                        <Button isLoading={isPending} size='full' onClick={handleUpdate}>
                            Save
                        </Button>
                        <Button disabled={isPending} size='full' onClick={handleCancel}>
                            Cancel
                        </Button>
                    </>
                )}
            </CardFooter>
        </Card>
    );
}
