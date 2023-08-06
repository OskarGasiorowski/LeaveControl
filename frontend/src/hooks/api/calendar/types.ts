export type GetCalendarResponse = {
    firstName: string;
    leaves: any[];
    surname: string;
    userId: string;
}[];

export type GetUserCalendarResponse = {
    leaves: Leave[];
};

export type LeaveDay = {
    day: Date;
    type: 'Full';
};

export type Leave = {
    id: string;
    leaveDays: LeaveDay[];
    reason: string;
    leaveStatus: 'pending' | 'accepted';
};

export type PostLeaveRequest = {
    entry: { date: Date; type: 'Full' | 'FirstHalf' | 'SecondHalf' }[];
    reason: string;
};

export type UpdateLeaveRequest = {
    entry: { date: Date; type: 'Full' | 'FirstHalf' | 'SecondHalf' }[];
    reason: string;
};

export type GetPendingLeaveRequests = {
    userId: string;
    firstName: string;
    surname: string;
    leaves: Leave[];
}[];
