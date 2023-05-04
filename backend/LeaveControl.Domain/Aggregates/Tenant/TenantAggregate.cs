using LeaveControl.Domain.Aggregates.Tenant.Events;
using LeaveControl.Domain.Types;

namespace LeaveControl.Domain.Aggregates.Tenant;

public class TenantAggregate : AggregateRoot<Guid>
{
    public TenantAggregate(){}

    private TenantAggregate(TenantId tenantId)
    {
        var @event = new TenantCreatedEvent
        {
            TenantId = tenantId,
        };
        
        Apply(@event);
        Enqueue(@event);
    }
    
    public static TenantAggregate Create() => new(TenantId.Generate());

    private void Apply(TenantCreatedEvent @event)
    {
        Id = @event.TenantId;
    }
}