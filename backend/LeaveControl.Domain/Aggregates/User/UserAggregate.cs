using LeaveControl.Domain.Aggregates.User.Events;
using LeaveControl.Domain.Aggregates.User.Models;
using LeaveControl.Domain.Types;

namespace LeaveControl.Domain.Aggregates.User;

public class UserAggregate : AggregateRoot<Guid>
{
    public Email Email { get; private set; }
    public HashedPassword Password { get; private set; }
    public Role Role { get; private set; }
    public TenantId TenantId { get; private set; }
    
    public UserAggregate() { }

    private UserAggregate(Email email, HashedPassword password, Role role, TenantId tenantId)
    {
        var @event = new UserCreatedEvent
        {
            UserId = UserId.Generate(),
            Email = email,
            Password = password,
            Role = role,
            TenantId = tenantId,
        };
        
        Apply(@event);
        Enqueue(@event);
    }

    public static UserAggregate CreateAdmin(CreateUser createUser)
    {
        return new UserAggregate(createUser.Email, createUser.Password, Role.IncompleteAdmin(), TenantId.Generate());
    }

    public void Apply(UserCreatedEvent @event)
    {
        Email = @event.Email;
        Password = @event.Password;
        Id = @event.UserId;
        Role = @event.Role;
        TenantId = @event.TenantId;
    }
}