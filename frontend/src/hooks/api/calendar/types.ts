export type GetCalendarResponse = {
    firstName: string;
    leaves: any[];
    pendingLeaveRequests: any[];
    surname: string;
    userId: string;
}[];

export type GetUserCalendarResponse = {
    leaves: any[];
    pendingLeaveRequests: any[];
};

export type PostLeaveRequest = {
    entry: { date: Date; type: 'Full' | 'FirstHalf' | 'SecondHalf' }[];
    reason: string;
};
