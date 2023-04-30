using LeaveControl.Domain.Repositories;
using LeaveControl.Domain.Types;
using LeaveControl.Domain.UserCalendar;
using Marten;

namespace LeaveControl.Infrastructure.Repositories;

public class UserCalendarRepository : IUserCalendarRepository
{
    private readonly IDocumentSession _documentSession;

    public UserCalendarRepository(IDocumentSession documentSession)
    {
        _documentSession = documentSession;
    }

    public async Task Create(UserCalendarAggregate aggregate)
    {
        var events = aggregate.DequeueUncommittedEvents();

        _documentSession.Events.StartStream<UserCalendarAggregate>(
            aggregate.Id,
            events
        );
        await _documentSession.SaveChangesAsync();
    }

    public Task<UserCalendarAggregate?> Get(UserId id)
    {
        return _documentSession.Events.AggregateStreamAsync<UserCalendarAggregate>(id);
    }

    public async Task Update(UserCalendarAggregate aggregate)
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