using LeaveControl.Domain.Aggregates.UserCalendar.Events;
using LeaveControl.Domain.Types;

namespace LeaveControl.Domain.Aggregates.UserCalendar;

public sealed record LeaveRequest
{
    public HashSet<LeaveDay> LeaveDays { get; set; } = new();
    public Reason Reason { get; set; }

    public bool Equals(LeaveRequest other)
    {
        if (other == null) return false;
        return LeaveDays.SetEquals(other.LeaveDays) && Reason == other.Reason;
    }
    
    public override int GetHashCode()
    {
        return HashCode.Combine(LeaveDays, Reason);
    }
}

public class UserCalendarAggregate : AggregateRoot<Guid>
{
    public IList<LeaveRequest> LeaveRequests { get; private set; } = new List<LeaveRequest>();
    
    public UserCalendarAggregate(){}

    private UserCalendarAggregate(UserId id)
    {
        Id = id;
    }

    public void RequestLeave(LeaveRequest leaveRequest)
    {
        if (LeaveRequests.SelectMany(r => r.LeaveDays).Overlaps(leaveRequest.LeaveDays))
        {
            // TODO better error handling
            throw new Exception();
        }

        var @event = LeaveRequestedEvent.Create(leaveRequest.LeaveDays, leaveRequest.Reason);

        Enqueue(@event);
        Apply(@event);
    }

    private void Apply(LeaveRequestedEvent @event)
    {
        LeaveRequests.Add(new()
        {
            Reason = @event.Reason,
            LeaveDays = @event.LeaveDays,
        });
    }

    // TODO think about it - what data should be stored when created
    public static UserCalendarAggregate Create(UserId id) => new(id);
}