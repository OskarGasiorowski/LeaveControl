import { Month } from './Month.tsx';
import { times } from 'lodash';
import { useState } from 'react';
import { GetUserCalendarResponse } from '../../hooks/api';
import * as dayjs from 'dayjs';
import { Card, Grid, Stack, Typography } from '@mui/material';
import { CarouselArrows } from '../CarouselArrows.tsx';

interface Props {
    calendar: GetUserCalendarResponse;
}

export function Calendar({ calendar }: Props) {
    const [year, setYear] = useState(dayjs(Date.now()).year());

    return (
        <Card component={Stack} gap={3} sx={{ paddingY: 3, paddingX: 6 }}>
            <Stack direction='row' justifyContent='center'>
                <CarouselArrows
                    onNext={() => setYear((prev) => prev + 1)}
                    onPrev={() => setYear((prev) => prev - 1)}
                >
                    <Typography sx={{ pt: '2px' }} variant='h5'>
                        {year}
                    </Typography>
                </CarouselArrows>
            </Stack>
            <Grid container spacing={4} rowGap={2}>
                {times(12).map((month) => (
                    <Month key={`${year}-${month}`} month={month} year={year} calendar={calendar} />
                ))}
            </Grid>
        </Card>
    );
}
