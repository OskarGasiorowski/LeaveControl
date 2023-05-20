using LeaveControl.Domain.Types;

namespace LeaveControl.Domain.Aggregates.User.Events;

public record UserDataUpdatedEvent : IUserEvent
{
    public FirstName FirstName { get; init; }
    public Surname Surname { get; init; }
    public UserId UserId { get; init; }
}