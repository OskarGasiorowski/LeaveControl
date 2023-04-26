using LeaveControl.Domain.Types;
using MediatR;

namespace LeaveControl.Application.Command.Calendar.AddLeave;

public class AddLeaveCommand : IRequest
{
    public Reason Reason { get; set; }
    public UserId UserId { get; set; }
    public IReadOnlyList<LeaveDay> LeaveDays { get; set; } = new List<LeaveDay>();
}