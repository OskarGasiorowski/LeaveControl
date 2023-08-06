using LeaveControl.Domain.Types;
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

    public async Task<LeaveRequestsListQuery.ResponseItem[]> Handle(LeaveRequestsListQuery request, CancellationToken cancellationToken)
    {
        return (await _documentSession
            .Query<LeaveProjection>()
            .ToArrayAsync(token: cancellationToken))
            .Select(leave => new LeaveRequestsListQuery.ResponseItem(leave.Id, leave.FirstName, leave.Surname, leave.Leaves.Where(l => l.LeaveStatus == LeaveStatus.Pending()).ToList()))
            .ToArray();
    }
}