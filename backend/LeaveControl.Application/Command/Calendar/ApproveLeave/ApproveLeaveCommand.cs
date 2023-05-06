using LeaveControl.Domain.Types;
using MediatR;

namespace LeaveControl.Application.Command.Calendar.AcceptLeave;

public record ApproveLeaveCommand : IRequest
{
    public LeaveId LeaveId { get; init; }
    public UserId UserCalendarId { get; init; }
}