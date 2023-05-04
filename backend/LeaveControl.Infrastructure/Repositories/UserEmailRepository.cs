using LeaveControl.Domain.Repositories;
using LeaveControl.Domain.Types;
using LeaveControl.Infrastructure.Projections;
using Marten;

namespace LeaveControl.Infrastructure.Repositories;

public class UserEmailRepository : IUserEmailRepository
{
    private readonly IDocumentSession _documentSession;

    public UserEmailRepository(IDocumentSession documentSession)
    {
        _documentSession = documentSession;
    }

    public Task<bool> Contains(Email email)
    {
        return _documentSession.
            Query<UsersEmailProjection>()
            .AnyAsync(projection => projection.Email == email);
    }
}