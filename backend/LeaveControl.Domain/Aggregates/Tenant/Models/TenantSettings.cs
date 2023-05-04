using LeaveControl.Domain.Types;

namespace LeaveControl.Domain.Aggregates.Tenant.Models;

public record TenantSettings
{
    public Allowance DefaultAllowance { get; init; }
    public bool AcceptanceRequired { get; init; }
    public bool AllowanceOverflowAllowed { get; init; }
}