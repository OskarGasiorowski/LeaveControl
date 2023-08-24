import ky from 'ky';
import {
    changePassword,
    ChangePasswordRequest,
    createAccount,
    CreateAccountRequest,
    login,
    LoginRequest,
} from './auth';
import { addUser, AddUserRequest, createTenant, CreateTenantRequest, getUsers } from './tenant';
import { useAuth } from '#modules/auth';
import { useMemo } from 'react';
import {
    deleteLeaveRequest,
    getCalendar,
    getUserCalendarOverview,
    postLeaveRequest,
    UpdateLeaveRequest,
    PostLeaveRequest,
    updateLeaveRequest,
    getPendingRequests,
} from './calendar';
import {
    approvePendingRequests,
    declinePendingRequests,
    getMyCalendar,
} from './calendar/services.ts';

export function useApi() {
    const { token } = useAuth();
    const api = ky.create({ prefixUrl: 'http://localhost:5255' });
    const authenticatedApi = useMemo(
        () =>
            ky.create({
                prefixUrl: 'http://localhost:5255',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        [token],
    );

    return {
        createAccount: (body: CreateAccountRequest) => createAccount(api, body),
        login: (body: LoginRequest) => login(api, body),
        setupWorkspace: (body: CreateTenantRequest) => createTenant(authenticatedApi, body),
        addUser: (body: AddUserRequest) => addUser(authenticatedApi, body),
        getUsers: () => getUsers(authenticatedApi),
        getCalendar: () => getCalendar(authenticatedApi),
        getUserCalendarOverview: (userId: string) =>
            getUserCalendarOverview(authenticatedApi, userId),
        getMyCalendar: () => getMyCalendar(authenticatedApi),
        postLeaveRequest: (body: PostLeaveRequest) => postLeaveRequest(authenticatedApi, body),
        updateLeave: (leaveId: string, body: UpdateLeaveRequest) =>
            updateLeaveRequest(authenticatedApi, leaveId, body),
        deleteLeave: (leaveId: string) => deleteLeaveRequest(authenticatedApi, leaveId),
        getPendingRequests: () => getPendingRequests(authenticatedApi),
        approvePendingRequests: (userId: string, leaveId: string) =>
            approvePendingRequests(authenticatedApi, userId, leaveId),
        declinePendingRequests: (userId: string, leaveId: string) =>
            declinePendingRequests(authenticatedApi, userId, leaveId),
        changePassword: (body: ChangePasswordRequest) => changePassword(authenticatedApi, body),
    };
}
