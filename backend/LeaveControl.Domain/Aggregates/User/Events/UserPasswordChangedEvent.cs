using LeaveControl.Domain.Types;

namespace LeaveControl.Domain.Aggregates.User.Events;

public record UserPasswordChangedEvent : IDomainEvent
{
    public HashedPassword Password { get; init; }
}