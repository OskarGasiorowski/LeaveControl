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
        };
        var userAddedEvent = new UserAddedEvent { UserId = adminId };
        
        Apply(@event);
        Apply(userAddedEvent);
        Enqueue(@event, userAddedEvent);
    }
    
    public static TenantAggregate Create(TenantSettings settings, UserId adminId) 
        => new(TenantId.Generate(), settings, adminId);

    private void Apply(TenantCreatedEvent @event)
    {
        Id = @event.TenantId;
        Settings = @event.Settings;
    }

    public void AddUser(UserId userId)
    {
        var @event = new UserAddedEvent { UserId = userId };
        Enqueue(@event);
        Apply(@event);
    }

    private void Apply(UserAddedEvent @event)
    {
        Users.Add(@event.UserId);
    }
}