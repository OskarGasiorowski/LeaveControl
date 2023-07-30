using JasperFx.Core;
using LeaveControl.Domain.Aggregates.UserCalendar.Models;
using LeaveControl.Infrastructure.Projections;
using Marten;
using Marten.Linq;
using MediatR;

namespace LeaveControl.Infrastructure.Query.Calendar;

public class CalendarQueryHandler : IRequestHandler<CalendarQuery, IReadOnlyList<CalendarQuery.Response>>
{
    private readonly IDocumentSession _documentSession;

    public CalendarQueryHandler(IDocumentSession documentSession)
    {
        _documentSession = documentSession;
    }

    public async Task<IReadOnlyList<CalendarQuery.Response>> Handle(CalendarQuery request, CancellationToken cancellationToken)
    {
        var calendars= await _documentSession
            .Query<LeaveProjection>()
            .ToListAsync(token: cancellationToken);

        return calendars.Select(calendar => new CalendarQuery.Response
        {
            UserId = calendar.Id,
            FirstName = calendar.FirstName,
            Surname = calendar.Surname,
            Leaves = calendar.Leaves
                .Map(leave => new LeaveRequest
                {
                    Id = leave.Id,
                    Reason = leave.Reason,
                    LeaveDays = leave.LeaveDays,
                }).ToList(),

        }).ToList();
    }
}