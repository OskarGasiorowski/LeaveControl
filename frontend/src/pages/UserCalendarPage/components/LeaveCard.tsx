import { Card, Stack, TextField, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
    title: string;
    days: number;
    reason: string;
    onReasonChange: (reason: string) => void;
    actions: ReactNode;
}

export function LeaveCard({ actions, title, days, reason, onReasonChange }: Props) {
    return (
        <Card sx={{ p: 3, width: '100%' }}>
            <Typography sx={{ marginBottom: -0.5 }} variant='subtitle2' gutterBottom>
                {title}
            </Typography>
            <Stack spacing={2}>
                <Typography variant='h3'>{days} days</Typography>
                <TextField
                    value={reason}
                    onChange={(event) => onReasonChange(event.target.value)}
                    label='Reason'
                    multiline
                    rows={4}
                />

                {actions}
            </Stack>
        </Card>
    );
}
