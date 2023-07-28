import { Day } from './Day.tsx';
import { noop } from 'lodash';

interface Props {
    day: number;
    month: number;
}

export function TakenDay({ day }: Props) {
    return <Day day={day} onClick={noop} color={{ base: '#7FBA7A', hover: '#A0D7E7' }} />;
}
