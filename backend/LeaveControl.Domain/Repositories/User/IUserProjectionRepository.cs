using LeaveControl.Domain.Repositories.User.Models;
using LeaveControl.Domain.Types;

namespace LeaveControl.Domain.Repositories.User;

public interface IUserProjectionRepository
{
    public Task<bool> Contains(Email email);
    Task<UserId?> GetId(Email email);
    Task<IReadOnlyList<UserProjectionDto>> Get();
}