using LeaveControl.Domain.Repositories.User;
using LeaveControl.Domain.Repositories.User.Models;
using MediatR;

namespace LeaveControl.Infrastructure.Query.User;

public class UserQueryHandler: IRequestHandler<UsersQuery, IReadOnlyList<UserProjectionDto>>
{
    private readonly IUserProjectionRepository _userProjectionRepository;

    public UserQueryHandler(IUserProjectionRepository userProjectionRepository)
    {
        _userProjectionRepository = userProjectionRepository;
    }

    public Task<IReadOnlyList<UserProjectionDto>> Handle(UsersQuery request, CancellationToken cancellationToken) 
        => _userProjectionRepository.Get();
}