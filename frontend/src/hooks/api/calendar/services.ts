import ky from 'ky';
import {
    GetCalendarResponse,
    GetPendingLeaveRequests,
    GetUserCalendarResponse,
    PostLeaveRequest,
    UpdateLeaveRequest,
} from './types.ts';

export function getCalendar(api: typeof ky): Promise<GetCalendarResponse> {
    return api.get('calendar').json<GetCalendarResponse>();
}

export function getUserCalendarOverview(
    api: typeof ky,
    userId: string,
): Promise<GetUserCalendarResponse> {
    return api.get(`calendar/${userId}`).json();
}

export function getMyCalendar(api: typeof ky): Promise<GetUserCalendarResponse> {
    return api.get(`calendar/me`).json<GetUserCalendarResponse>();
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

export async function deleteLeaveRequest(api: typeof ky, leaveId: string): Promise<void> {
    await api.delete(`calendar/me/leave/${leaveId}`);
}

export function getPendingRequests(api: typeof ky) {
    return api.get('calendar/requests').json<GetPendingLeaveRequests>();
}

export async function approvePendingRequests(api: typeof ky, userId: string, leaveId: string) {
    await api.post(`calendar/${userId}/leave/${leaveId}/approve`);
}

export async function declinePendingRequests(api: typeof ky, userId: string, leaveId: string) {
    await api.post(`calendar/${userId}/leave/${leaveId}/decline`, { json: { reason: '' } });
}
