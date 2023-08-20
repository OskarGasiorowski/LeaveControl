import { selectedDatesAtom } from '#components';
import { useAtom } from 'jotai';
import { useLeaveRequest } from '#hooks';
import { LeaveCard } from './LeaveCard.tsx';
import { useState } from 'react';
import { Button, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';

interface Props {
    userId: string;
}

export function AddLeaveCard({ userId }: Props) {
    const [reason, setReason] = useState('');
    // TODO hide those inside hooks and export it from module
    const [selectedDates, setSelectedDates] = useAtom(selectedDatesAtom);
    const { request, isPending } = useLeaveRequest(userId!, () => setSelectedDates([]));

    function handleRequest() {
        request({
            entry: selectedDates.map((date) => ({
                date,
                type: 'Full',
            })),
            reason: reason,
        });
    }

    if (selectedDates.length === 0) {
        return null;
    }

    return (
        <LeaveCard
            title='Book a leave'
            days={selectedDates.length}
            reason={reason}
            onReasonChange={setReason}
            actions={
                <Stack direction='row' spacing={1.5}>
                    <Button
                        disabled={isPending}
                        fullWidth
                        variant='contained'
                        onClick={() => setSelectedDates([])}
                    >
                        Clear
                    </Button>

                    <LoadingButton
                        loading={isPending}
                        fullWidth
                        variant='contained'
                        color='primary'
                        onClick={handleRequest}
                    >
                        Request
                    </LoadingButton>
                </Stack>
            }
        />
    );
}
