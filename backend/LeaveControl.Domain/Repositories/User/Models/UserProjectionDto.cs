using LeaveControl.Domain.Types;

namespace LeaveControl.Domain.Repositories.User.Models;

public record UserProjectionDto
{
    public UserId Id { get; set; }
    public Email Email { get; set; }
    public FirstName FirstName { get; set; }
    public Surname Surname { get; set; }
}