using LeaveControl.Domain.Aggregates.UserCalendar.Models;
using LeaveControl.Domain.Types;
using MediatR;

namespace LeaveControl.Infrastructure.Query.Calendar;

public record CalendarQuery : IRequest<IReadOnlyList<CalendarQuery.Response>>
{
    public record Response
    {
        public UserId UserId { get; init; }
        public FirstName FirstName { get; init; }
        public Surname Surname { get; init; }
        public IList<LeaveRequest> Leaves { get; init; } = new List<LeaveRequest>();
        public IList<LeaveRequest> PendingLeaveRequests { get; init; } = new List<LeaveRequest>();
    }
}