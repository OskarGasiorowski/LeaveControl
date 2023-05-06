using LeaveControl.Domain.Types;

namespace LeaveControl.Domain.Repositories;

public interface IUserEmailRepository
{
    public Task<bool> Contains(Email email);
    Task<UserId?> GetId(Email email);
}