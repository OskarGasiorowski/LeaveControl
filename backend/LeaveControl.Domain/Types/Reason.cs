using Newtonsoft.Json;

namespace LeaveControl.Domain.Types;

[JsonConverter(typeof(ToStringJsonConverter))]
public readonly struct Reason
{
    private readonly string _reason;

    [JsonConstructor]
    private Reason(string reason)
    {
        _reason = reason;
    }
    
    public static implicit operator Reason(string reason) => new(reason);
    public static implicit operator string(Reason reason) => reason.ToString();

    public override string ToString()
    {
        return _reason;
    }
}