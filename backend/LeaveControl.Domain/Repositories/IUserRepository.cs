using LeaveControl.Domain.Aggregates.User;

namespace LeaveControl.Domain.Repositories;

public interface IUserRepository : IRepository<UserAggregate> {}