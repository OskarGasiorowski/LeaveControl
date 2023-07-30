import ky from 'ky';
import { createAccount, CreateAccountRequest, login, LoginRequest } from './auth';
import { addUser, AddUserRequest, createTenant, CreateTenantRequest, getUsers } from './tenant';
import { useAuth } from '#modules/auth';
import { useMemo } from 'react';
import {
    deleteLeaveRequest,
    getCalendar,
    getUserCalendar,
    postLeaveRequest,
    UpdateLeaveRequest,
    PostLeaveRequest,
    updateLeaveRequest,
} from './calendar';

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
        setupAccount: (body: CreateTenantRequest) => createTenant(authenticatedApi, body),
        addUser: (body: AddUserRequest) => addUser(authenticatedApi, body),
        getUsers: () => getUsers(authenticatedApi),
        getCalendar: () => getCalendar(authenticatedApi),
        getUserCalendar: (userId: string) => getUserCalendar(authenticatedApi, userId),
        postLeaveRequest: (body: PostLeaveRequest) => postLeaveRequest(authenticatedApi, body),
        updateLeave: (leaveId: string, body: UpdateLeaveRequest) =>
            updateLeaveRequest(authenticatedApi, leaveId, body),
        deleteLeave: (leaveId: string) => deleteLeaveRequest(authenticatedApi, leaveId),
    };
}
