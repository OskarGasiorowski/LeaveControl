using LeaveControl.Domain.Aggregates.User;
using LeaveControl.Domain.Repositories;
using Marten;

namespace LeaveControl.Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
    private readonly IDocumentSession _documentSession;

    public UserRepository(IDocumentSession documentSession)
    {
        _documentSession = documentSession;
    }

    public async Task Create(UserAggregate aggregate)
    {
        var events = aggregate.DequeueUncommittedEvents();
        
        _documentSession.ForTenant("").Events.StartStream<UserAggregate>(
            aggregate.Id,
            events
        );
        await _documentSession.SaveChangesAsync();
    }

    public Task<UserAggregate?> Get(Guid id)
    {
        return _documentSession.ForTenant("").Events.AggregateStreamAsync<UserAggregate>(id);
    }

    public async Task Update(UserAggregate aggregate)
    {
        var events = aggregate.DequeueUncommittedEvents();

        var nextVersion = aggregate.Version + events.Length;

        _documentSession.ForTenant("").Events.Append(
            aggregate.Id,
            nextVersion,
            events
        );

        await _documentSession.SaveChangesAsync();
    }
}