using LeaveControl.Domain.Types;
using MediatR;

namespace LeaveControl.Application.Command.User.ResetPassword;

public record ResetPasswordCommand: IRequest<JwtToken>
{
    public UserId UserId { get; init; }
    public Password Password { get; init; }
}