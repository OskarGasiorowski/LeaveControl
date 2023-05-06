using LeaveControl.Domain.Repositories.User.Models;
using MediatR;

namespace LeaveControl.Infrastructure.Query.User;

public record UsersQuery : IRequest<IReadOnlyList<UserProjectionDto>>;