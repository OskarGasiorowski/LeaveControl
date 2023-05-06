using LeaveControl.Domain.Types;

namespace LeaveControl.Domain.Aggregates.UserCalendar.Events;

public record LeaveAutoApprovedEvent : IDomainEvent
{
    public LeaveId LeaveId { get; init; }
}