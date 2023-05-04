using LeaveControl.Domain.Types;

namespace LeaveControl.Domain.Aggregates.Tenant.Events;

public record TenantCreatedEvent
{
    public TenantId TenantId { get; set; }
}