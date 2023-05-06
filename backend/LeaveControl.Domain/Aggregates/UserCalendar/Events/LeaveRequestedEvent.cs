using LeaveControl.Domain.Types;

namespace LeaveControl.Domain.Aggregates.UserCalendar.Events;

public record LeaveRequestedEvent : IDomainEvent
{
    public LeaveId LeaveId { get; set; }
    public HashSet<LeaveDay> LeaveDays { get; set; } = new();
    public Reason Reason { get; set; }

    public static LeaveRequestedEvent Create(Guid leaveId, HashSet<LeaveDay> leaveDays, Reason reason)
    {
        return new LeaveRequestedEvent
        {
            LeaveId = leaveId,
            LeaveDays = leaveDays,
            Reason = reason,
        };
    }
}