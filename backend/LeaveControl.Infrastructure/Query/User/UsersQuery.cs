using LeaveControl.Domain.Repositories.User.Models;
using LeaveControl.Domain.Types;
using MediatR;

namespace LeaveControl.Infrastructure.Query.User;

public record UsersQuery(TenantId TenantId) : IRequest<IReadOnlyList<UserProjectionDto>>;