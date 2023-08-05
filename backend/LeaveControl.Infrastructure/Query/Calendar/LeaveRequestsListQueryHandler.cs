using LeaveControl.Infrastructure.Projections;
using LeaveControl.Utils;
using Marten;
using MediatR;

namespace LeaveControl.Infrastructure.Query.Calendar;

public class LeaveRequestsListQueryHandler : IRequestHandler<LeaveRequestsListQuery, LeaveRequestsListQuery.ResponseItem[]>
{
    private readonly IDocumentSession _documentSession;

    public LeaveRequestsListQueryHandler(IDocumentSession documentSession)
    {
        _documentSession = documentSession;
    }

    public Task<LeaveRequestsListQuery.ResponseItem[]> Handle(LeaveRequestsListQuery request, CancellationToken cancellationToken)
    {
        return _documentSession
            .Query<LeaveProjection>()
            .Select(leave => new LeaveRequestsListQuery.ResponseItem(leave.Id, leave.FirstName, leave.Surname, leave.Leaves.Where(l => !l.LeaveStatus.IsPending).ToList()))
            .ToArrayAsync(token: cancellationToken);
    }
}