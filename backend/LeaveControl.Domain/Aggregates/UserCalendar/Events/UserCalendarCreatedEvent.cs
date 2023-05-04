using LeaveControl.Domain.Aggregates.UserCalendar.Models;
using LeaveControl.Domain.Types;

namespace LeaveControl.Domain.Aggregates.UserCalendar.Events;

public record UserCalendarCreatedEvent : IDomainEvent
{
    public CalendarSettings Settings { get; init; }
    public UserId UserId { get; init; }

    public static UserCalendarCreatedEvent Create(CalendarSettings settings, UserId userId)
    {
        return new UserCalendarCreatedEvent
        {
            Settings = settings,
            UserId = userId,
        };
    }
}