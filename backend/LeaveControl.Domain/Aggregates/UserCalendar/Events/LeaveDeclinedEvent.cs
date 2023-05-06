using LeaveControl.Domain.Types;

namespace LeaveControl.Domain.Aggregates.UserCalendar.Events;

public record LeaveDeclinedEvent : IDomainEvent
{
    public LeaveId LeaveId { get; init; }
    public Reason DeclineReason { get; init; }
}