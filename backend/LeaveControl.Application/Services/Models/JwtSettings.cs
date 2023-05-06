namespace LeaveControl.Application.Services.Models;

public class JwtSettings
{
    public string Issuer { get; init; } = "";
    public string Audience { get; init; } = "";
    public string Key { get; init; } = "";
    public int ExpirationHours { get; init; }
}