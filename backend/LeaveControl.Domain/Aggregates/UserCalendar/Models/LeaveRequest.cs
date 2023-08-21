using LeaveControl.Domain.Types;

namespace LeaveControl.Domain.Aggregates.UserCalendar.Models;

public sealed record LeaveRequest
{
    public LeaveId Id { get; set; }
    public HashSet<LeaveDay> LeaveDays { get; set; } = new();
    public Reason Reason { get; set; }
    public LeaveStatus LeaveStatus { get; set; }
    public int Allowance { get; set; }

    public bool Equals(LeaveRequest other)
    {
        if (other == null) return false;
        return LeaveDays.SetEquals(other.LeaveDays) && Reason == other.Reason;
    }
    
    public override int GetHashCode()
    {
        return HashCode.Combine(Id, LeaveDays, Reason);
    }
}