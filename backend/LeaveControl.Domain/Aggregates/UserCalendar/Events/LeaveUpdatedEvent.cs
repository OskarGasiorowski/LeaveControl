using LeaveControl.Domain.Types;

namespace LeaveControl.Domain.Aggregates.UserCalendar.Events;

public record LeaveUpdatedEvent : IUserEvent
{
    public UserId UserId { get; init; }
    public LeaveId LeaveId { get; init; }
    public HashSet<LeaveDay> LeaveDays { get; init; } = new();
    public Reason Reason { get; init; }

    public static LeaveUpdatedEvent Create(UserId userId, Guid leaveId, HashSet<LeaveDay> leaveDays, Reason reason)
    {
        return new LeaveUpdatedEvent
        {
            UserId = userId,
            LeaveId = leaveId,
            LeaveDays = leaveDays,
            Reason = reason,
        };
    }
}