using LeaveControl.Domain.Types;

namespace LeaveControl.Domain.Aggregates.User.Events;

public record UserDataUpdatedEvent : IDomainEvent
{
    public FirstName FirstName { get; init; }
    public Surname Surname { get; init; }
}