using LeaveControl.Domain.Types;
using MediatR;

namespace LeaveControl.Application.Command.User.Authenticate;

public record AuthenticateCommand : IRequest<AuthenticateCommand.Response>
{
    public Email Email { get; init; }
    public Password Password { get; init; }
    
    public record Response
    {
        public JwtToken Token { get; init; }
        public UserId UserId { get; init; }
        public TenantId TenantId { get; init; }
    }
}