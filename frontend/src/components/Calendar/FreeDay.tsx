import { useAtom } from 'jotai';
import { selectedDatesAtom } from '#components';
import { Day } from './Day.tsx';

interface Props {
    day: number;
    month: number;
}

const colorSet: Record<'free' | 'selected', { base: string; hover: string }> = {
    free: { base: 'gray.800', hover: 'gray.600' },
    selected: { base: 'primary.300', hover: 'primary.200' },
};

export function FreeDay({ day, month }: Props) {
    const [selectedDates, setSelectedDates] = useAtom(selectedDatesAtom);
    function handleDayClick(clickedDay: number) {
        const dateIsSelected = selectedDates.some(
            (date) => date.getMonth() === month && date.getDate() === clickedDay,
        );

        if (!dateIsSelected) {
            setSelectedDates((prev) => [...prev, new Date(2023, month, clickedDay)]);
            return;
        }

        setSelectedDates((prev) =>
            prev.filter((date) => !(date.getMonth() === month && date.getDate() === clickedDay)),
        );
    }

    const dateIsSelected = selectedDates.some(
        (date) => date.getMonth() === month && date.getDate() === day,
    );
    const color = colorSet[dateIsSelected ? 'selected' : 'free'];

    return <Day day={day} color={color} onClick={() => handleDayClick(day)} />;
}
