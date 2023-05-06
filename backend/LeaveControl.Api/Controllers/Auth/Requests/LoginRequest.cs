namespace LeaveControl.Api.Controllers.Auth.Requests;

public record LoginRequest
{
    public string Email { get; init; } = "";
    public string Password { get; init; } = "";
}