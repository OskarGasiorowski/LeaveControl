using LeaveControl.Domain.Types;

namespace LeaveControl.Domain.Aggregates.User.Models;

public record CreateUser
{
    public Email Email { get; init; }
    public HashedPassword Password { get; init; }
}