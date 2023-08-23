using LeaveControl.Domain.Aggregates.UserCalendar.Models;
using LeaveControl.Domain.Types;
using MediatR;

namespace LeaveControl.Domain.Aggregates.UserCalendar.Events;

public record UserCalendarCreatedEvent : IUserEvent
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