using LeaveControl.Domain.Types;

namespace LeaveControl.Domain.Aggregates.UserCalendar.Models;

public sealed record LeaveRequest
{
    public Guid Id { get; set; }
    public HashSet<LeaveDay> LeaveDays { get; set; } = new();
    public Reason Reason { get; set; }

    public bool Equals(LeaveRequest other)
    {
        if (other == null) return false;
        return LeaveDays.SetEquals(other.LeaveDays) && Reason == other.Reason;
    }
    
    public override int GetHashCode()
    {
        return HashCode.Combine(LeaveDays, Reason);
    }
}