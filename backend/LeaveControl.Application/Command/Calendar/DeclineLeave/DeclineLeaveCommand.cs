using LeaveControl.Domain.Types;
using MediatR;

namespace LeaveControl.Application.Command.Calendar.DeclineLeave;

public record DeclineLeaveCommand : IRequest
{
    public UserId UserCalendarId { get; init; }
    public LeaveId LeaveId { get; init; }
    public Reason DeclineReason { get; init; }
}