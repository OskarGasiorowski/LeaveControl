using LeaveControl.Domain.Types;
using LeaveControl.Domain.UserCalendar;
using LeaveControl.Infrastructure.Repositories;
using Marten;
using Testcontainers.PostgreSql;

namespace LeaveControl.Infrastructure.Tests;

public class UserCalendarRepositoryTests : IAsyncLifetime
{
    private readonly PostgreSqlContainer _postgreSqlContainer = new PostgreSqlBuilder().Build();
    
    [Fact]
    public async Task CreateAndGet_UserCalendarAggregate_ReturnsExpectedAggregate()
    {
        using var documentStore = DocumentStore.For(_postgreSqlContainer.GetConnectionString());
        using var session = documentStore.LightweightSession();
        var repository = new UserCalendarRepository(session);

        var aggregate = UserCalendarAggregate.Create(UserId.Generate());
        aggregate.RequestLeave(new()
        {
            Reason = "test reason",
            LeaveDays = new HashSet<LeaveDay>(new []
            {
                LeaveDay.Full(DateTime.Now),
                LeaveDay.Full(DateTime.Now.AddDays(1)),
                LeaveDay.Full(DateTime.Now.AddDays(2))
            }),
        });

        await repository.Create(aggregate);
        var dbAggregate = await repository.Get(aggregate.Id);
        
        Assert.NotNull(dbAggregate);
        Assert.Equal(aggregate.Id, dbAggregate.Id);
        Assert.Equal(aggregate.LeaveRequests.Count, dbAggregate.LeaveRequests.Count);
        var leaveRequestEqual = aggregate.LeaveRequests.SequenceEqual(dbAggregate.LeaveRequests);
        Assert.True(leaveRequestEqual);
    }

    public Task InitializeAsync()
    {
        return _postgreSqlContainer.StartAsync();
    }

    public Task DisposeAsync()
    {
        return _postgreSqlContainer.DisposeAsync().AsTask();
    }
}