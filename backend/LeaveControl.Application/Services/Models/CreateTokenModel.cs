using LeaveControl.Domain.Types;

namespace LeaveControl.Application.Services.Models;

public record CreateTokenModel(UserId UserId, Email Email, Role Role, TenantId TenantId);