using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;

using Testcontainers.PostgreSql;
using Microsoft.VisualStudio.TestPlatform.TestHost;

namespace LeaveControl.Api.IntegrationTests;

public class ApiTestFixture : WebApplicationFactory<Program>, IAsyncLifetime
{
    private PostgreSqlContainer _postgreSqlContainer;

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.UseEnvironment("Testing");
        builder.UseSetting("EventStore:ConnectionString", _postgreSqlContainer.GetConnectionString());
    }

    public Task InitializeAsync()
    {
        _postgreSqlContainer = new PostgreSqlBuilder()
            .Build();

        return _postgreSqlContainer.StartAsync();
    }

    public Task DisposeAsync()
    {
        return _postgreSqlContainer.DisposeAsync().AsTask();
    }
}