using LeaveControl.Domain.Repositories;
using LeaveControl.Domain.Types;
using Marten;
using MediatR;

namespace LeaveControl.Infrastructure.Repositories;

public class Repository<TAggregate> : IRepository<TAggregate> where TAggregate : AggregateRoot<Guid>
{
    private readonly IDocumentSession _documentSession;
    private readonly IMediator _mediator;

    public Repository(IDocumentSession documentSession, IMediator mediator)
    {
        _documentSession = documentSession;
        _mediator = mediator;
    }
    
    public async Task Create(TAggregate aggregate)
    {
        var events = aggregate.DequeueUncommittedEvents();

        _documentSession.Events.StartStream<TAggregate>(
            aggregate.Id,
            events
        );

        var tasks = events
            .Where(e => e is INotification)
            .Select(e => _mediator.Publish(e))
            .ToArray();
        await Task.WhenAll(tasks);
        
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
        
        var tasks = events
            .Where(e => e is INotification)
            .Select(e => _mediator.Publish(e))
            .ToArray();
        await Task.WhenAll(tasks);

        await _documentSession.SaveChangesAsync();
    }
}