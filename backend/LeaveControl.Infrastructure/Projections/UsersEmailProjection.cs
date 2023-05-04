using LeaveControl.Domain.Aggregates.User.Events;
using Marten.Events.Aggregation;
using Marten.Schema;

namespace LeaveControl.Infrastructure.Projections;

public class UsersEmailProjection
{
    [Identity] 
    public Guid Id { get; set; }

    public string Email { get; set; } = default!;

    public void Apply(UserCreatedEvent @event)
    {
        Id = @event.UserId;
        Email = @event.Email;
    }
}

public class UsersEmailProjectionSetup : SingleStreamProjection<UsersEmailProjection>
{
    public UsersEmailProjectionSetup()
    {
        ProjectEvent<UserCreatedEvent>((projection, @event) => projection.Apply(@event));
    }
}