using LeaveControl.Domain.Types;

namespace LeaveControl.Domain.Aggregates.UserCalendar.Events;

public record LeaveDeclinedEvent : IUserEvent
{
    public LeaveId LeaveId { get; init; }
    public Reason DeclineReason { get; init; }
    public UserId UserId { get; init; }
}