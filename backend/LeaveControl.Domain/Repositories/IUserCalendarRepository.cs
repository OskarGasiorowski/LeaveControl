using LeaveControl.Domain.Types;
using LeaveControl.Domain.UserCalendar;

namespace LeaveControl.Domain.Repositories;

public interface IUserCalendarRepository
{
    public Task Create(UserCalendarAggregate aggregate);
    public Task<UserCalendarAggregate> Get(UserId id);
    public Task Update(UserCalendarAggregate aggregate);
}