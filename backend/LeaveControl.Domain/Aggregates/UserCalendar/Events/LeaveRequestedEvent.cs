using LeaveControl.Domain.Types;

namespace LeaveControl.Domain.Aggregates.UserCalendar.Events;

public record LeaveRequestedEvent : IDomainEvent
{
    public HashSet<LeaveDay> LeaveDays { get; set; } = new();
    public Reason Reason { get; set; }

    public static LeaveRequestedEvent Create(HashSet<LeaveDay> leaveDays, Reason reason)
    {
        return new LeaveRequestedEvent
        {
            LeaveDays = leaveDays,
            Reason = reason,
        };
    }
}