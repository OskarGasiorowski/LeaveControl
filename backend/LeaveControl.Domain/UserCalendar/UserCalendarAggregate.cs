using LeaveControl.Domain.Types;

namespace LeaveControl.Domain.UserCalendar;

public record LeaveRequest
{
    public HashSet<LeaveDay> LeaveDays { get; set; } = new HashSet<LeaveDay>();
    public Reason Reason { get; set; }
}

public class UserCalendarAggregate : AggregateRoot<UserId>
{
    private readonly IList<LeaveRequest> _leaveRequests = new List<LeaveRequest>();

    public void RequestLeave(LeaveRequest leaveRequest)
    {
        if (_leaveRequests.SelectMany(r => r.LeaveDays).Overlaps(leaveRequest.LeaveDays))
        {
            // TODO better error handling
            throw new Exception();
        }
        
        _leaveRequests.Add(leaveRequest);
    }
}