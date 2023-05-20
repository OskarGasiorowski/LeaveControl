using LeaveControl.Domain.Types;

namespace LeaveControl.Domain.Aggregates.User.Events;

public record UserCreatedEvent : IUserEvent
{
    public UserId UserId { get; init; }
    public Email Email { get; init; }
    public HashedPassword Password { get; init; }
    public FirstName FirstName { get; init; }
    public Surname Surname { get; init; }
    public Role Role { get; init; }
    public TenantId TenantId { get; init; }
}