namespace LeaveControl.Domain.Types;

using System.Collections.Generic;
using System.Linq;

// TODO think if this should be one generic event
public interface IDomainEvent
{
}

public abstract class AggregateRoot<T>
{
    public T Id { get; protected set; } = default!;

    public int Version { get; protected set; }

    [NonSerialized]
    // TODO better type
    private readonly Queue<object> _uncommittedEvents = new();

    public object[] DequeueUncommittedEvents()
    {
        var dequeuedEvents = _uncommittedEvents.ToArray();
        _uncommittedEvents.Clear();
        return dequeuedEvents;
    }

    protected void Enqueue(object @event)
    {
        _uncommittedEvents.Enqueue(@event);
    }
}