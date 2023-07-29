using LeaveControl.Domain.Types;
using MediatR;

namespace LeaveControl.Application.Command.Calendar.UpdateLeave;

public record UpdateLeaveCommand : IRequest
{
    public Reason Reason { get; set; }
    public UserId UserId { get; set; }
    public LeaveId LeaveId { get; set; }
    public IReadOnlyList<LeaveDay> LeaveDays { get; set; } = new List<LeaveDay>();
}