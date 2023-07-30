using LeaveControl.Domain.Types;

namespace LeaveControl.Domain.Aggregates.UserCalendar.Events;

public record LeaveRequestedEvent : IUserEvent
{
    public UserId UserId { get; init; }
    public LeaveId LeaveId { get; init; }
    public HashSet<LeaveDay> LeaveDays { get; init; } = new();
    public Reason Reason { get; init; }
    public LeaveStatus LeaveStatus { get; init; }

    public static LeaveRequestedEvent Create(UserId userId, Guid leaveId, HashSet<LeaveDay> leaveDays, Reason reason, LeaveStatus leaveStatus)
    {
        return new LeaveRequestedEvent
        {
            UserId = userId,
            LeaveId = leaveId,
            LeaveDays = leaveDays,
            Reason = reason,
            LeaveStatus = leaveStatus
        };
    }
}