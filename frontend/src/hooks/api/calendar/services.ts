import ky from 'ky';

export function getCalendar(api: typeof ky): Promise<object> {
    return api.get('calendar').json<object>();
}
