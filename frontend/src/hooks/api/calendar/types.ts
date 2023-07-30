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
};

export type PostLeaveRequest = {
    entry: { date: Date; type: 'Full' | 'FirstHalf' | 'SecondHalf' }[];
    reason: string;
};

export type UpdateLeaveRequest = {
    entry: { date: Date; type: 'Full' | 'FirstHalf' | 'SecondHalf' }[];
    reason: string;
};
