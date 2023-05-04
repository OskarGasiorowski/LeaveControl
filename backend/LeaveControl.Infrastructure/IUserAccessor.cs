using LeaveControl.Domain.Types;

namespace LeaveControl.Infrastructure;

public interface IUserAccessor
{
    UserId? GetCurrentUserId();
    TenantId? GetCurrentTenantId();
}