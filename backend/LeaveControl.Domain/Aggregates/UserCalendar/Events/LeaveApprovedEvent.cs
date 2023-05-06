using LeaveControl.Domain.Types;

namespace LeaveControl.Domain.Aggregates.UserCalendar.Events;

public record LeaveApprovedEvent : IDomainEvent
{
    public LeaveId LeaveId { get; init; }
}