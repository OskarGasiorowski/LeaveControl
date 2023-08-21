using LeaveControl.Domain.Types;
using LeaveControl.Infrastructure.Projections;
using Marten;
using MediatR;

namespace LeaveControl.Infrastructure.Query.Calendar;

public class UserCalendarOverviewQueryHandler : IRequestHandler<UserCalendarOverviewQuery, UserCalendarOverviewQuery.Response>
{
    private readonly IDocumentSession _documentSession;

    public UserCalendarOverviewQueryHandler(IDocumentSession documentSession)
    {
        _documentSession = documentSession;
    }

    public async Task<UserCalendarOverviewQuery.Response> Handle(UserCalendarOverviewQuery request, CancellationToken cancellationToken)
    {
        var calendar = await _documentSession
            .Query<LeaveProjection>()
            .SingleAsync(projection => projection.Id == request.UserId, token: cancellationToken);

        return new UserCalendarOverviewQuery.Response(calendar.Leaves.Where(l => l.LeaveStatus == LeaveStatus.Accepted()).ToList(), calendar.FirstName, calendar.Surname);
    }
}