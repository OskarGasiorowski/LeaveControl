using LeaveControl.Infrastructure.Projections;
using Marten;
using MediatR;

namespace LeaveControl.Infrastructure.Query.Calendar;

public class UserCalendarQueryHandler : IRequestHandler<UserCalendarQuery, UserCalendarQuery.Response>
{
    private readonly IDocumentSession _documentSession;

    public UserCalendarQueryHandler(IDocumentSession documentSession)
    {
        _documentSession = documentSession;
    }

    public async Task<UserCalendarQuery.Response> Handle(UserCalendarQuery request, CancellationToken cancellationToken)
    {
        var calendar = await _documentSession
            .Query<LeaveProjection>()
            .SingleAsync(projection => projection.Id == request.UserId, token: cancellationToken);

        return new UserCalendarQuery.Response(calendar.Leaves, calendar.Allowance, calendar.FirstName, calendar.Surname);
    }
}