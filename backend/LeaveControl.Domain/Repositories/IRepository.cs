using LeaveControl.Domain.Aggregates.UserCalendar;
using LeaveControl.Domain.Types;

namespace LeaveControl.Domain.Repositories;

public interface IRepository<TAggregate> where TAggregate : AggregateRoot<Guid>
{
    public Task Create(TAggregate aggregate);
    public Task<TAggregate?> Get(Guid id);
    public Task Update(TAggregate aggregate);
}