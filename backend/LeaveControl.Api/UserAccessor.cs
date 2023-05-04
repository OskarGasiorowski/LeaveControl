using System.Security.Claims;
using LeaveControl.Domain.Types;
using LeaveControl.Infrastructure;

namespace LeaveControl.Api;

public class UserAccessor : IUserAccessor
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public UserAccessor(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public UserId? GetCurrentUserId()
    {
        var userIdClaim = _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null)
        {
            return null;
        }

        return Guid.Parse(userIdClaim.Value);
    }

    public TenantId? GetCurrentTenantId()
    {
        var tenantIdClaim = _httpContextAccessor.HttpContext?.User?.FindFirst("tenant_id");
        if (tenantIdClaim == null)
        {
            return null;
        }

        return Guid.Parse(tenantIdClaim.Value);
    }
}