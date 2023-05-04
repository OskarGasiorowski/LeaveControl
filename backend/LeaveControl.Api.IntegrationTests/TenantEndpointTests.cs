using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using LeaveControl.Api.Controllers.Auth.Requests;
using LeaveControl.Api.Controllers.Tenant.Requests;
using LeaveControl.Domain.Types;

namespace LeaveControl.Api.IntegrationTests;

public class TenantEndpointTests : IClassFixture<ApiTestFixture>
{
    private readonly ApiTestFixture _fixture;

    public TenantEndpointTests(ApiTestFixture fixture)
    {
        _fixture = fixture;
    }
    
    [Fact]
    public async Task CreateTenant_ReturnsSuccessStatusCode()
    {
        var client = _fixture.CreateClient();
        
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
        var token = await response.Content.ReadAsStringAsync();
        
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.NotEmpty(token);
    }
}