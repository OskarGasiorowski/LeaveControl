using LeaveControl.Domain.Types;
using MediatR;

namespace LeaveControl.Application.Command.Calendar.ApproveLeave;

public record ApproveLeaveCommand : IRequest
{
    public LeaveId LeaveId { get; init; }
    public UserId UserCalendarId { get; init; }
}