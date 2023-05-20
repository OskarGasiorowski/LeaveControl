using Newtonsoft.Json;

namespace LeaveControl.Domain.Types;

[JsonConverter(typeof(ToStringJsonConverter))]
public readonly struct TenantId
{
    private readonly Guid _id;

    [JsonConstructor]
    private TenantId(Guid id)
    {
        _id = id;
    }
    
    public static implicit operator TenantId(Guid id) => new(id);
    public static implicit operator TenantId(string id) => new(Guid.Parse(id));
    public static implicit operator Guid(TenantId id) => id._id;

    public static TenantId Generate() => Guid.NewGuid();

    public override string ToString()
    {
        return _id.ToString();
    }
}