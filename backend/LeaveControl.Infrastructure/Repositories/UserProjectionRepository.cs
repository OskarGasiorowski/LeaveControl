using LeaveControl.Domain.Repositories;
using LeaveControl.Domain.Repositories.User;
using LeaveControl.Domain.Repositories.User.Models;
using LeaveControl.Domain.Types;
using LeaveControl.Infrastructure.Projections;
using Marten;
using Marten.Linq;

namespace LeaveControl.Infrastructure.Repositories;

public class UserProjectionRepository : IUserProjectionRepository
{
    private readonly IDocumentSession _documentSession;

    public UserProjectionRepository(IDocumentSession documentSession)
    {
        _documentSession = documentSession;
    }

    public Task<bool> Contains(Email email)
    {
        return _documentSession.
            Query<UsersProjection>()
            .AnyAsync(projection => projection.Email == email.ToString());
    }
    
    public async Task<UserId?> GetId(Email email)
    {
        var result =  await _documentSession
            .ForTenant("")
            .Query<UsersProjection>()
            .Where(projection => projection.Email == email.ToString())
            .SingleOrDefaultAsync();

        return result?.Id ?? null;
    }

    public async Task<IReadOnlyList<UserProjectionDto>> Get()
    {
        var result = await _documentSession.Query<UsersProjection>()
            .ToListAsync();

        return result
            .Select(projection => new UserProjectionDto
            {
                Id = projection.Id,
                Email = projection.Email,
                Surname = projection.Surname,
                FirstName = projection.FirstName
            })
            .ToList();
    }
}