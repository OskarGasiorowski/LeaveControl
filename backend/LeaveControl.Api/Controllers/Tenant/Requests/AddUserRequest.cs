namespace LeaveControl.Api.Controllers.Tenant.Requests;

public record AddUserRequest
{
    public string FirstName { get; init; } = "";
    public string Surname { get; init; } = "";
    public string Email { get; init; } = "";
}