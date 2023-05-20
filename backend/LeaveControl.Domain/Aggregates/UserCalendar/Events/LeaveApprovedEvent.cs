using LeaveControl.Domain.Types;

namespace LeaveControl.Domain.Aggregates.UserCalendar.Events;

public record LeaveApprovedEvent : IUserEvent
{
    public LeaveId LeaveId { get; init; }
    public UserId UserId { get; init; }
}