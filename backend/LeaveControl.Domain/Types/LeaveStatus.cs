using Newtonsoft.Json;

namespace LeaveControl.Domain.Types;

[JsonConverter(typeof(ToStringJsonConverter))]
public readonly struct LeaveStatus
{
    private readonly string _leaveStatus;

    [JsonConstructor]
    private LeaveStatus(string leaveStatus)
    {
        _leaveStatus = leaveStatus;
    }

    public static LeaveStatus Pending() => new LeaveStatus("pending");
    public static LeaveStatus Accepted() => new LeaveStatus("accepted");
    
    public static bool operator ==(LeaveStatus left, LeaveStatus right) => left._leaveStatus == right._leaveStatus;
    public static bool operator !=(LeaveStatus left, LeaveStatus right) => !(left == right);
    public static implicit operator LeaveStatus(string leaveStatus) => new(leaveStatus);

    public bool IsPending => this == Pending();

    public override string ToString()
    {
        return _leaveStatus;
    }
    
    public bool Equals(LeaveStatus other)
    {
        return _leaveStatus == other._leaveStatus;
    }

    public override bool Equals(object obj)
    {
        return obj is LeaveStatus other && Equals(other);
    }

    public override int GetHashCode()
    {
        return _leaveStatus != null ? _leaveStatus.GetHashCode() : 0;
    }
}