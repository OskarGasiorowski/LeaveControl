using LeaveControl.Domain.Types;
using MediatR;

namespace LeaveControl.Application.Command.Calendar.DeleteLeave;

public record DeleteLeaveCommand(UserId UserId, LeaveId LeaveId) : IRequest;