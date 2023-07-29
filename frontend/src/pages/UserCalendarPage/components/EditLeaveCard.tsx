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
import { useAtom, useSetAtom } from 'jotai';
import {
    editModeAtom,
    leaveEditingAtom,
    selectedLeaveIdAtom,
} from '../../../components/Calendar/atom.ts';
import { GetUserCalendarResponse } from '../../../hooks/api';

interface Props {
    calendar: GetUserCalendarResponse;
}

export function EditLeaveCard({ calendar }: Props) {
    const [editMode, setEditMode] = useAtom(editModeAtom);
    const setLeaveEditing = useSetAtom(leaveEditingAtom);
    const [selectedLeaveId] = useAtom(selectedLeaveIdAtom);

    const selectedLeave = calendar?.leaves.find((leave) => leave.id === selectedLeaveId);

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
                        <Button size='full' onClick={handleCancel}>
                            Save
                        </Button>
                        <Button size='full' onClick={handleCancel}>
                            Cancel
                        </Button>
                    </>
                )}
            </CardFooter>
        </Card>
    );
}
