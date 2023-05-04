using LeaveControl.Application.Services;
using LeaveControl.Domain.Aggregates.User;
using LeaveControl.Domain.Repositories;
using LeaveControl.Domain.Types;
using MediatR;

namespace LeaveControl.Application.Command.User.CreateUser;

public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, CreateUserCommand.Response>
{
    private readonly IRepository<UserAggregate> _userRepository;
    private readonly IJwtService _jwtService;

    public CreateUserCommandHandler(IRepository<UserAggregate> userRepository, IJwtService jwtService)
    {
        _userRepository = userRepository;
        _jwtService = jwtService;
    }

    public async Task<CreateUserCommand.Response> Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        // TODO check if user with given email exists
        
        var user = UserAggregate.CreateAdmin(new()
        {
            Email = request.Email,
            Password = request.Password.GenerateHash(),
        });

        await _userRepository.Create(user);
        return new CreateUserCommand.Response
        {
            Token = _jwtService.Create(user),
            UserId = user.Id,
            TenantId = user.TenantId,
        };
    }
}