using LeaveControl.Domain.Aggregates.Tenant.Events;
using LeaveControl.Domain.Aggregates.Tenant.Models;
using LeaveControl.Domain.Types;

namespace LeaveControl.Domain.Aggregates.Tenant;

public class TenantAggregate : AggregateRoot<Guid>
{
    public TenantSettings Settings { get; private set; }
    public IList<UserId> Users { get; private set; } = new List<UserId>();
    
    public TenantAggregate(){}

    private TenantAggregate(TenantId tenantId, TenantSettings settings, UserId adminId)
    {
        var @event = new TenantCreatedEvent
        {
            TenantId = tenantId,
            Settings = settings,
            AdminId = adminId,
        };
        
        Apply(@event);
        Enqueue(@event);
    }
    
    public static TenantAggregate Create(TenantSettings settings, UserId adminId) 
        => new(TenantId.Generate(), settings, adminId);

    private void Apply(TenantCreatedEvent @event)
    {
        Id = @event.TenantId;
        Settings = @event.Settings;
        Users.Add(@event.AdminId);
    }
}