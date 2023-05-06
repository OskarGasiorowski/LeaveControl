using LeaveControl.Domain.Types;

namespace LeaveControl.Domain.Aggregates.User.Models;

public record CreateUser
{
    public Email Email { get; init; }
    public HashedPassword Password { get; init; }
    public FirstName FirstName { get; init; }
    public Surname Surname { get; init; }
}