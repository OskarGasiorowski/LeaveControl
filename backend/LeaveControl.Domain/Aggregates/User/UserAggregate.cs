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
            "",
            "",
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

    public void Update(FirstName firstName, Surname surname)
    {
        var @event = new UserDataUpdatedEvent
        {
            FirstName = firstName,
            Surname = surname,
        };
        
        Apply(@event);
        Enqueue(@event);
    }

    private void Apply(UserDataUpdatedEvent @event)
    {
        FirstName = @event.FirstName;
        Surname = @event.Surname;
    }

    // TODO security risk! Old passwords shouldn't be stored anymore in events stream! Encrypt password, store keys and drop it when password changed!
    public void ChangePassword(HashedPassword password)
    {
        var @event = new UserPasswordChangedEvent { Password = password };
        Enqueue(@event);
        Apply(@event);
    }

    private void Apply(UserPasswordChangedEvent @event)
    {
        Password = @event.Password;
    }

    public void MakeStandard()
    {
        var @event = new UserChangedToStandardEvent();
        Enqueue(@event);
        Apply(@event);
    }

    private void Apply(UserChangedToStandardEvent @event)
    {
        Role = Role.User();
    }
}