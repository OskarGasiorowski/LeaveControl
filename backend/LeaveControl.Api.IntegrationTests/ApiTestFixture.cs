using System.Net.Http.Headers;
using System.Net.Http.Json;
using LeaveControl.Api.Controllers.Auth.Requests;
using LeaveControl.Api.Controllers.Tenant.Requests;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;

using Testcontainers.PostgreSql;

namespace LeaveControl.Api.IntegrationTests;

public abstract class HttpFixtureBase : IClassFixture<ApiTestFixture>
{
    protected readonly ApiTestFixture Fixture;

    protected HttpFixtureBase(ApiTestFixture fixture)
    {
        Fixture = fixture;
    }
    
    protected async Task<string> PrepareAdminAndGetToken()
    {
        var client = Fixture.CreateClient();
        
        var authResponse = await client.PostAsync("/auth/register", JsonContent.Create(new RegisterRequest
        {
            AdminEmail = "jan.kowalski@example.com",
            AdminPassword = "superstrongpassword",
        }));
        var authPayload = await authResponse.Content.ReadFromJsonAsync<RegisterRequest.Response>();
        
        var request = new HttpRequestMessage(HttpMethod.Post, "/tenant");
        request.Content = JsonContent.Create(new CreateTenantRequest
        {
            AcceptanceRequired = true,
            AllowanceOverflowAllowed = false,
            DefaultAllowance = 25,
            AdminSurname = "Jan",
            AdminFirstName = "Kowalski",
        });
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", authPayload!.Token);
        var response = await client.SendAsync(request);
        return await response.Content.ReadAsStringAsync();
    }
} 

public class ApiTestFixture : WebApplicationFactory<Program>, IAsyncLifetime
{
    private PostgreSqlContainer? _postgreSqlContainer;

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.UseEnvironment("Testing");
        builder.UseSetting("EventStore:ConnectionString", _postgreSqlContainer?.GetConnectionString());
    }

    public Task InitializeAsync()
    {
        _postgreSqlContainer = new PostgreSqlBuilder()
            .WithPortBinding(59793, 5432)
            .Build();

        return _postgreSqlContainer.StartAsync();
    }

    Task IAsyncLifetime.DisposeAsync()
    {
        return _postgreSqlContainer?.DisposeAsync().AsTask() ?? Task.CompletedTask;
    }
}