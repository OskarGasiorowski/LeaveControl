using LeaveControl.Domain.Repositories;
using LeaveControl.Domain.Types;
using Marten;

namespace LeaveControl.Infrastructure.Repositories;

public class Repository<TAggregate> : IRepository<TAggregate> where TAggregate : AggregateRoot<Guid>
{
    private readonly IDocumentSession _documentSession;

    public Repository(IDocumentSession documentSession)
    {
        _documentSession = documentSession;
    }
    
    public async Task Create(TAggregate aggregate)
    {
        var events = aggregate.DequeueUncommittedEvents();

        _documentSession.Events.StartStream<TAggregate>(
            aggregate.Id,
            events
        );
        await _documentSession.SaveChangesAsync();
    }

    public Task<TAggregate?> Get(Guid id)
    {
        return _documentSession.Events.AggregateStreamAsync<TAggregate>(id);
    }

    public async Task Update(TAggregate aggregate)
    {
        var events = aggregate.DequeueUncommittedEvents();

        var nextVersion = aggregate.Version + events.Length;

        _documentSession.Events.Append(
            aggregate.Id,
            nextVersion,
            events
        );

        await _documentSession.SaveChangesAsync();
    }
}