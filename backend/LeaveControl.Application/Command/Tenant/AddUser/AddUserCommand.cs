using LeaveControl.Domain.Types;
using MediatR;

namespace LeaveControl.Application.Command.Tenant.AddUser;

public record AddUserCommand : IRequest<AddUserCommand.Response>
{
    public Email Email { get; init; }
    public FirstName FirstName { get; init; }
    public Surname Surname { get; init; }
    public TenantId TenantId { get; init; }

    public record Response
    {
        public UserId UserId { get; init; }
    }
}