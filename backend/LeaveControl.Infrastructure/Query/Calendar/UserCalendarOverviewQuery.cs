using LeaveControl.Domain.Aggregates.UserCalendar.Models;
using LeaveControl.Domain.Types;
using MediatR;

namespace LeaveControl.Infrastructure.Query.Calendar;

public record UserCalendarOverviewQuery(UserId UserId) : IRequest<UserCalendarOverviewQuery.Response>
{
    public record Response(IList<LeaveRequest> Leaves, FirstName FirstName, Surname Surname);
};