namespace LeaveControl.Domain.Types;

public readonly struct TenantId
{
    private readonly Guid _id;

    private TenantId(Guid id)
    {
        _id = id;
    }
    
    public static implicit operator TenantId(Guid id) => new(id);
    public static implicit operator Guid(TenantId id) => id._id;

    public static TenantId Generate() => Guid.NewGuid();

    public override string ToString()
    {
        return _id.ToString();
    }
}