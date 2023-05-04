using LeaveControl.Domain.Aggregates.UserCalendar;
using LeaveControl.Domain.Aggregates.UserCalendar.Models;
using LeaveControl.Domain.Types;

namespace LeaveControl.Domain.Tests.UserCalendar;

public class LeaveRequestCollectionTests
{
    [Fact]
    public void LeaveRequest_CollectionsAreEqual_SingleLeaveRequest()
    {
        var date = new DateTime(2023, 5, 10);
        var leaveDays1 = new HashSet<LeaveDay> { LeaveDay.Full(date) };
        var leaveDays2 = new HashSet<LeaveDay> { LeaveDay.Full(date) };
        var leaveRequest1 = new LeaveRequest { LeaveDays = leaveDays1, Reason = "Vacation" };
        var leaveRequest2 = new LeaveRequest { LeaveDays = leaveDays2, Reason = "Vacation" };

        var list1 = new List<LeaveRequest> { leaveRequest1 };
        var list2 = new List<LeaveRequest> { leaveRequest2 };

        var areEqual = list1.SequenceEqual(list2, EqualityComparer<LeaveRequest>.Default);

        Assert.True(areEqual);
    }

    [Fact]
    public void LeaveRequest_CollectionsAreEqual_MultipleLeaveRequests()
    {
        var date = new DateTime(2023, 5, 10);
        var leaveDays1 = new HashSet<LeaveDay> { LeaveDay.Full(date), LeaveDay.FirstHalf(date.AddDays(1)) };
        var leaveDays2 = new HashSet<LeaveDay> { LeaveDay.Full(date), LeaveDay.FirstHalf(date.AddDays(1)) };
        var leaveDays3 = new HashSet<LeaveDay> { LeaveDay.Full(date), LeaveDay.FirstHalf(date.AddDays(2)) };
        var leaveDays4 = new HashSet<LeaveDay> { LeaveDay.Full(date), LeaveDay.FirstHalf(date.AddDays(2)) };
        var leaveRequest1 = new LeaveRequest { LeaveDays = leaveDays1, Reason = "Vacation" };
        var leaveRequest2 = new LeaveRequest { LeaveDays = leaveDays2, Reason = "Vacation" };
        var leaveRequest3 = new LeaveRequest { LeaveDays = leaveDays3, Reason = "Sick" };
        var leaveRequest4 = new LeaveRequest { LeaveDays = leaveDays4, Reason = "Sick" };

        var list1 = new List<LeaveRequest> { leaveRequest1, leaveRequest3 };
        var list2 = new List<LeaveRequest> { leaveRequest2, leaveRequest4 };

        var areEqual = list1.SequenceEqual(list2, EqualityComparer<LeaveRequest>.Default);

        Assert.True(areEqual);
    }

    [Fact]
    public void LeaveRequest_CollectionsAreNotEqual_DifferentLeaveDays()
    {
        var date = new DateTime(2023, 5, 10);
        var leaveDays1 = new HashSet<LeaveDay> { LeaveDay.Full(date), LeaveDay.FirstHalf(date.AddDays(1)) };
        var leaveDays2 = new HashSet<LeaveDay> { LeaveDay.Full(date), LeaveDay.FirstHalf(date.AddDays(2)) };
        var leaveRequest1 = new LeaveRequest { LeaveDays = leaveDays1, Reason = "Vacation" };
        var leaveRequest2 = new LeaveRequest { LeaveDays = leaveDays2, Reason = "Vacation" };

        var list1 = new List<LeaveRequest> { leaveRequest1 };
        var list2 = new List<LeaveRequest> { leaveRequest2 };

        var areEqual = list1.SequenceEqual(list2, EqualityComparer<LeaveRequest>.Default);

        Assert.False(areEqual);
    }
}