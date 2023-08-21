using LeaveControl.Domain.Aggregates.UserCalendar.Models;
using LeaveControl.Domain.Types;
using MediatR;

namespace LeaveControl.Infrastructure.Query.Calendar;

public record UserCalendarQuery(UserId UserId) : IRequest<UserCalendarQuery.Response>
{
    public record Response(IList<LeaveRequest> Leaves, int Allowance, FirstName FirstName, Surname Surname);
};