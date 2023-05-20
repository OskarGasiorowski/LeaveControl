using Newtonsoft.Json;

namespace LeaveControl.Domain.Types;

[JsonConverter(typeof(ToStringJsonConverter))]
public readonly struct LeaveId
{
    public override int GetHashCode()
    {
        return _id.GetHashCode();
    }

    private readonly Guid _id;
    
    private LeaveId(Guid id)
    {
        _id = id;
    }

    public static implicit operator LeaveId(Guid id) => new(id);
    public static implicit operator LeaveId(string id) => new(Guid.Parse(id));
    public static implicit operator Guid(LeaveId id) => id._id;
    public static bool operator ==(LeaveId left, LeaveId right) => left._id == right._id;
    public static bool operator !=(LeaveId left, LeaveId right) => !(left == right);

    public static LeaveId Generate() => Guid.NewGuid();

    public override string ToString()
    {
        return _id.ToString();
    }

    private bool Equals(LeaveId other)
    {
        return _id.Equals(other._id);
    }
    
    public override bool Equals(object obj)
    {
        return obj is LeaveId other && Equals(other);
    }
}