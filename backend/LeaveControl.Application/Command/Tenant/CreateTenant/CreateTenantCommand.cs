using LeaveControl.Domain.Types;
using MediatR;

namespace LeaveControl.Application.Command.Tenant.CreateTenant;

public record CreateTenantCommand : IRequest<CreateTenantCommand.Response>
{
    public Email AdminEmail { get; set; }
    public Password AdminPassword { get; set; }
    
    public record Response
    {
        public JwtToken Token { get; set; }
    }
}