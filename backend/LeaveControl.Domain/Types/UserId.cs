namespace LeaveControl.Domain.Types;

public struct UserId
{
    private readonly Guid _id;

    private UserId(Guid id)
    {
        _id = id;
    }
    
    public static implicit operator UserId(Guid id) => new(id);
    public static implicit operator Guid(UserId id) => id._id;

    public override string ToString()
    {
        return _id.ToString();
    }
}