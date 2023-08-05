using LeaveControl.Domain.Aggregates.UserCalendar.Models;
using LeaveControl.Domain.Types;
using MediatR;

namespace LeaveControl.Infrastructure.Query.Calendar;

public record LeaveRequestsListQuery : IRequest<LeaveRequestsListQuery.ResponseItem[]>
{
    public record ResponseItem(UserId UserId, FirstName FirstName, Surname Surname, IList<LeaveRequest> Leaves);
};