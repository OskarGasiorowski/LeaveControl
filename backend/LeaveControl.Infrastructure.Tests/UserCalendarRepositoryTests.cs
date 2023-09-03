using LeaveControl.Domain.Aggregates.UserCalendar;
using LeaveControl.Domain.Aggregates.UserCalendar.Models;
using LeaveControl.Domain.Types;
using LeaveControl.Infrastructure.Repositories;
using Marten;
using MediatR;
using Moq;
using Testcontainers.PostgreSql;

namespace LeaveControl.Infrastructure.Tests;

public class UserCalendarRepositoryTests : IAsyncLifetime
{
    private readonly PostgreSqlContainer _postgreSqlContainer = new PostgreSqlBuilder().Build();
    
    [Fact]
    public async Task CreateAndGet_UserCalendarAggregate_ReturnsExpectedAggregate()
    {
        using var documentStore = DocumentStore.For(_postgreSqlContainer.GetConnectionString());
        var mock = new Mock<IMediator>();

        await using var session = documentStore.LightweightSession();
        var repository = new Repository<UserCalendarAggregate>(session, mock.Object);

        var aggregate = UserCalendarAggregate.New(UserId.Generate(), new CalendarSettings
        {
            Allowance = 25,
            AcceptanceRequired = true,
            AllowanceOverflowAllowed = false,
        });
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
        Assert.Equal(aggregate.Leaves.Count, dbAggregate.Leaves.Count);
        var leaveRequestEqual = aggregate.Leaves.SequenceEqual(dbAggregate.Leaves);
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