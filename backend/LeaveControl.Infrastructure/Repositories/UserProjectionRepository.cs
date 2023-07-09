using LeaveControl.Domain.Aggregates.Tenant;
using LeaveControl.Domain.Repositories;
using LeaveControl.Domain.Repositories.User;
using LeaveControl.Domain.Repositories.User.Models;
using LeaveControl.Domain.Types;
using LeaveControl.Infrastructure.Projections;
using Marten;

namespace LeaveControl.Infrastructure.Repositories;

public class UserProjectionRepository : IUserProjectionRepository
{
    private readonly IDocumentSession _documentSession;
    private readonly IRepository<TenantAggregate> _tenantRepository;

    public UserProjectionRepository(IDocumentSession documentSession, IRepository<TenantAggregate> tenantRepository)
    {
        _documentSession = documentSession;
        _tenantRepository = tenantRepository;
    }

    public Task<bool> Contains(Email email)
    {
        return _documentSession
            .Query<UsersProjection>()
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

    public async Task<IReadOnlyList<UserProjectionDto>> GetAllByTenant(TenantId tenantId)
    {
        // TODO create projection for it first
        var tenant = await _tenantRepository.Get(tenantId);
        var usersId = tenant!.Users.Select(userId => (Guid)userId).ToList();
        
        var result = await _documentSession.Query<UsersProjection>()
            .Where(user => usersId.Contains(user.Id))
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