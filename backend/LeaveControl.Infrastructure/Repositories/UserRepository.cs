using LeaveControl.Domain.Aggregates.User;
using LeaveControl.Domain.Repositories;
using Marten;
using MediatR;

namespace LeaveControl.Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
    private readonly IDocumentSession _documentSession;
    private readonly IMediator _mediator;

    public UserRepository(IDocumentSession documentSession, IMediator mediator)
    {
        _documentSession = documentSession;
        _mediator = mediator;
    }

    public async Task Create(UserAggregate aggregate)
    {
        var events = aggregate.DequeueUncommittedEvents();
        
        _documentSession.ForTenant("").Events.StartStream<UserAggregate>(
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
        
        var tasks = events
            .Where(e => e is INotification)
            .Select(e => _mediator.Publish(e))
            .ToArray();
        await Task.WhenAll(tasks);

        await _documentSession.SaveChangesAsync();
    }
}