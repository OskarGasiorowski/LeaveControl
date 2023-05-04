using LeaveControl.Domain.Types;
using MediatR;

namespace LeaveControl.Application.Command.Tenant.CreateTenant;

public record CreateTenantCommand : IRequest<CreateTenantCommand.Response>
{
    public UserId UserId { get; init; }
    
    public Allowance DefaultAllowance { get; init; }
    public bool AcceptanceRequired { get; init; }
    public bool AllowanceOverflowAllowed { get; init; }
    
    public FirstName AdminFirstName { get; init; }
    public Surname AdminSurname { get; init; }
    
    public record Response
    {
        public JwtToken Token { get; set; }
    }
}