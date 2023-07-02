import ky from 'ky';
import { GetCalendarResponse } from './types.ts';

export function getCalendar(api: typeof ky): Promise<GetCalendarResponse> {
    return api.get('calendar').json<GetCalendarResponse>();
}
