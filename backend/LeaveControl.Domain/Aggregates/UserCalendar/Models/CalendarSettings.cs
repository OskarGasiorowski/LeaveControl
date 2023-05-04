using LeaveControl.Domain.Types;

namespace LeaveControl.Domain.Aggregates.UserCalendar.Models;

public record CalendarSettings
{
    public Allowance Allowance { get; init; }
    public bool AcceptanceRequired { get; init; }
    public bool AllowanceOverflowAllowed { get; init; }
}