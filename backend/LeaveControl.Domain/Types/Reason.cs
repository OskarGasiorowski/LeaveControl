using Newtonsoft.Json;

namespace LeaveControl.Domain.Types;

public readonly struct Reason
{
    [JsonProperty]
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