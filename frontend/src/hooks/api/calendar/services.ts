import ky from 'ky';
import {
    GetCalendarResponse,
    GetUserCalendarResponse,
    PostLeaveRequest,
    UpdateLeaveRequest,
} from './types.ts';

export function getCalendar(api: typeof ky): Promise<GetCalendarResponse> {
    return api.get('calendar').json<GetCalendarResponse>();
}

export function getUserCalendar(api: typeof ky, userId: string): Promise<GetUserCalendarResponse> {
    return api.get(`calendar/${userId}`).json<GetUserCalendarResponse>();
}

export async function postLeaveRequest(api: typeof ky, body: PostLeaveRequest): Promise<void> {
    await api.post(`calendar/me/leave`, { json: body });
}

export async function updateLeaveRequest(
    api: typeof ky,
    leaveId: string,
    body: UpdateLeaveRequest,
): Promise<void> {
    await api.put(`calendar/me/leave/${leaveId}`, { json: body });
}
