using LeaveControl.Domain.Types;

namespace LeaveControl.Domain.Aggregates.Tenant.Events;

public record UserAddedEvent
{
    public UserId UserId { get; init; }
}