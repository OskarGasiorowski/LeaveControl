using LeaveControl.Domain.Aggregates.User.Events;
using LeaveControl.Domain.Types;
using Marten.Events.Aggregation;
using Marten.Schema;

namespace LeaveControl.Infrastructure.Projections;

public class UsersProjection
{
    [Identity] 
    public Guid Id { get; set; }

    [UniqueIndex(IndexType = UniqueIndexType.Computed)]
    public string Email { get; set; } = default!;
    public FirstName FirstName { get; set; }
    public Surname Surname { get; set; }

    public void Apply(UserCreatedEvent @event)
    {
        Id = @event.UserId;
        Email = @event.Email;
        FirstName = @event.FirstName;
        Surname = @event.Surname;
    }
    
    public void Apply(UserDataUpdatedEvent @event)
    {
        FirstName = @event.FirstName;
        Surname = @event.Surname;
    }
}

public class UsersProjectionSetup : SingleStreamProjection<UsersProjection>
{
    public UsersProjectionSetup()
    {
        ProjectEvent<UserCreatedEvent>((projection, @event) => projection.Apply(@event));
        ProjectEvent<UserDataUpdatedEvent>((projection, @event) => projection.Apply(@event));
    }
}