using LeaveControl.Domain.Types;

namespace LeaveControl.Domain.Aggregates.User.Events;

public record UserCreatedEvent : IDomainEvent
{
    public UserId UserId { get; init; }
    public Email Email { get; init; }
    public HashedPassword Password { get; init; }
    public Role Role { get; init; }
    public TenantId TenantId { get; init; }
}