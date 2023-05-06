using LeaveControl.Domain.Aggregates.User.Events;
using LeaveControl.Domain.Aggregates.User.Models;
using LeaveControl.Domain.Types;

namespace LeaveControl.Domain.Aggregates.User;

public class UserAggregate : AggregateRoot<Guid>
{
    public Email Email { get; private set; }
    public HashedPassword Password { get; private set; }
    public FirstName FirstName { get; private set; }
    public Surname Surname { get; private set; }
    public Role Role { get; private set; }
    public TenantId TenantId { get; private set; }
    
    public UserAggregate() { }

    private UserAggregate(Email email, HashedPassword password, FirstName firstName, Surname surname, Role role, TenantId tenantId)
    {
        var @event = new UserCreatedEvent
        {
            UserId = UserId.Generate(),
            Email = email,
            Password = password,
            FirstName = firstName,
            Surname = surname,
            Role = role,
            TenantId = tenantId,
        };
        
        Apply(@event);
        Enqueue(@event);
    }

    public static UserAggregate CreateAdmin(CreateUser createUser)
    {
        return new UserAggregate(
            createUser.Email,
            createUser.Password,
            createUser.FirstName,
            createUser.Surname,
            Role.IncompleteAdmin(),
            TenantId.Generate()
        );
    }
    
    public static UserAggregate CreateStandard(CreateUser createUser, TenantId tenantId)
    {
        return new UserAggregate(
            createUser.Email,
            createUser.Password,
            createUser.FirstName,
            createUser.Surname,
            Role.InvitedUser(),
            tenantId
        );
    }

    private void Apply(UserCreatedEvent @event)
    {
        Id = @event.UserId;
        Email = @event.Email;
        Password = @event.Password;
        FirstName = @event.FirstName;
        Surname = @event.Surname;
        Role = @event.Role;
        TenantId = @event.TenantId;
    }

    public void MakeAdmin()
    {
        var @event = new UserChangedToAdminEvent();
        Apply(@event);
        Enqueue(@event);
    }

    private void Apply(UserChangedToAdminEvent @event)
    {
        Role = Role.Admin();
    }
}