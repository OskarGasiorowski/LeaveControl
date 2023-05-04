using LeaveControl.Domain.Aggregates.Tenant.Models;
using LeaveControl.Domain.Types;

namespace LeaveControl.Domain.Aggregates.Tenant.Events;

public record TenantCreatedEvent
{
    public TenantId TenantId { get; init; }
    public TenantSettings Settings { get; init; }
    public UserId AdminId { get; init; }
}