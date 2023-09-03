using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using LeaveControl.Application.Services.Jwt.Models;
using LeaveControl.Domain.Types;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace LeaveControl.Application.Services.Jwt;

public interface IJwtService
{
    public JwtToken Create(CreateTokenModel model, int? expirationHours = null);
}

public class JwtService : IJwtService
{
    private readonly JwtSettings _settings;

    public JwtService(IOptions<JwtSettings> settings)
    {
        _settings = settings.Value;
    }

    public JwtToken Create(CreateTokenModel model, int? expirationHours = null)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_settings.Key));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, model.UserId.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, model.Email.ToString()),
            new Claim(ClaimTypes.Role, model.Role.ToString()),
            new Claim("role", model.Role.ToString()),
            new Claim("tenant_id", model.TenantId.ToString()),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        };

        var token = new JwtSecurityToken(
            issuer: _settings.Issuer,
            audience: _settings.Audience,
            claims: claims,
            expires: DateTime.UtcNow.AddHours(expirationHours ?? _settings.ExpirationHours),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}