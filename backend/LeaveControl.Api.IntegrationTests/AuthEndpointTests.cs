using System.Net;
using System.Net.Http.Json;
using LeaveControl.Api.Controllers.Auth.Requests;
using LeaveControl.Domain;
using LeaveControl.Infrastructure;

namespace LeaveControl.Api.IntegrationTests;

public class AuthEndpointTests : IClassFixture<ApiTestFixture>
{
    private readonly ApiTestFixture _fixture;

    public AuthEndpointTests(ApiTestFixture fixture)
    {
        _fixture = fixture;
    }

    [Fact]
    public async Task Register_ReturnsSuccessStatusCode()
    {
        var client = _fixture.CreateClient();
        
        var response = await client.PostAsync("/auth/register", JsonContent.Create(new RegisterRequest
        {
            AdminEmail = "oskar@example.com",
            AdminPassword = "superstrongpassword",
        }));

        var payload = await response.Content.ReadFromJsonAsync<RegisterRequest.Response>();
        
        Assert.NotNull(payload);
        Assert.NotEmpty(payload.Token);
        Assert.IsType<Guid>(payload.TenantId);
        Assert.NotEqual(Guid.Empty, payload.TenantId);
        Assert.IsType<Guid>(payload.UserId);
        Assert.NotEqual(Guid.Empty, payload.UserId);
        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
    }
    
    [Fact]
    public async Task RegisterButEmailAlreadyExist_ReturnsConflict()
    {
        var client = _fixture.CreateClient();
        
        await client.PostAsync("/auth/register", JsonContent.Create(new RegisterRequest
        {
            AdminEmail = "jan@example.com",
            AdminPassword = "superstrongpassword",
        }));
        
        var response = await client.PostAsync("/auth/register", JsonContent.Create(new RegisterRequest
        {
            AdminEmail = "jan@example.com",
            AdminPassword = "superstrongpassword2",
        }));

        var payload = await response.Content.ReadFromJsonAsync<RequestFailedBody>();
        
        Assert.NotNull(payload);
        Assert.Equal(HttpStatusCode.Conflict, response.StatusCode);
        var exception = AppException.UserWithGivenEmailExists();
        Assert.Equal(exception.Message, payload.Message);
        Assert.Equal(exception.CodeNumber, payload.CodeNumber);
        Assert.Equal(exception.Code, payload.Code);
        Assert.Equal(exception.Type.ToString(), payload.Type);
    }

    [Fact]
    public async Task Register_WithEmptyEmail_ReturnsBadRequest()
    {
        var client = _fixture.CreateClient();

        var response = await client.PostAsync("/auth/register", JsonContent.Create(new RegisterRequest
        {
            AdminEmail = "",
            AdminPassword = "superstrongpassword",
        }));

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }
    
    [Fact]
    public async Task Register_WithInvalidEmailFormat_ReturnsBadRequest()
    {
        var client = _fixture.CreateClient();

        var response = await client.PostAsync("/auth/register", JsonContent.Create(new RegisterRequest
        {
            AdminEmail = "invalid-email",
            AdminPassword = "superstrongpassword",
        }));

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }
    
    [Fact]
    public async Task Register_WithEmptyPassword_ReturnsBadRequest()
    {
        var client = _fixture.CreateClient();

        var response = await client.PostAsync("/auth/register", JsonContent.Create(new RegisterRequest
        {
            AdminEmail = "oskar@example.com",
            AdminPassword = "",
        }));

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }
    
    [Fact]
    public async Task Register_WithShortPassword_ReturnsBadRequest()
    {
        var client = _fixture.CreateClient();

        var response = await client.PostAsync("/auth/register", JsonContent.Create(new RegisterRequest
        {
            AdminEmail = "oskar@example.com",
            AdminPassword = "short",
        }));

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }
}