using LeaveControl.Domain.Types;
using MediatR;

namespace LeaveControl.Domain.Aggregates.User.Events;

public record UserCreatedEvent : IUserEvent, INotification
{
    public UserId UserId { get; init; }
    public Email Email { get; init; }
    public HashedPassword Password { get; init; }
    public FirstName FirstName { get; init; }
    public Surname Surname { get; init; }
    public Role Role { get; init; }
    public TenantId TenantId { get; init; }
}