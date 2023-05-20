namespace LeaveControl.Domain.Types;

public interface IUserEvent
{
    public UserId UserId { get; init; }
}