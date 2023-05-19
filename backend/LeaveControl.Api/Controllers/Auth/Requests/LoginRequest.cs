namespace LeaveControl.Api.Controllers.Auth.Requests;

public record LoginRequest
{
    public string Email { get; init; } = "";
    public string Password { get; init; } = "";
    
    public record Response
    {
        public string Token { get; init; } = default!;
        public Guid UserId { get; init; } = default!;
        public Guid TenantId { get; init; } = default!;
    }
}