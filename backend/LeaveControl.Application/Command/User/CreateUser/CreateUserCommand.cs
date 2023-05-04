using LeaveControl.Domain.Types;
using MediatR;

namespace LeaveControl.Application.Command.User.CreateUser;

public record CreateUserCommand : IRequest<CreateUserCommand.Response>
{
    public Email Email { get; init; }
    public Password Password { get; init; }
    public Role Role { get; init; }

    public record Response
    {
        public JwtToken Token { get; init; }
        public UserId UserId { get; init; }
        public TenantId TenantId { get; init; }
    }
}