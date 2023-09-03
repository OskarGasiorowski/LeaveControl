namespace LeaveControl.Application.Services.Jwt.Models;

public class JwtSettings
{
    public string Issuer { get; init; } = "";
    public string Audience { get; init; } = "";
    public string Key { get; init; } = "";
    public int ExpirationHours { get; init; }
}