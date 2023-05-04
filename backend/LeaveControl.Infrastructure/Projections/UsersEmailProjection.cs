using LeaveControl.Domain.Aggregates.User.Events;
using LeaveControl.Domain.Types;
using Marten.Events.Aggregation;
using Marten.Schema;
using Newtonsoft.Json;

namespace LeaveControl.Domain.Aggregates.User.Projections;

public class UsersEmailProjection
{
    [Identity]
    public Guid Id { get; set; }
    public string Email { get; set; }

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