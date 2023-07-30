using LeaveControl.Domain.Types;

namespace LeaveControl.Domain.Aggregates.UserCalendar.Events;

public record LeaveDeletedEvent(UserId UserId, LeaveId LeaveId) : IUserEvent;