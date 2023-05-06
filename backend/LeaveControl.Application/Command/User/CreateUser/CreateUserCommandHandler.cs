using LeaveControl.Application.Services;
using LeaveControl.Domain;
using LeaveControl.Domain.Aggregates.User;
using LeaveControl.Domain.Repositories;
using LeaveControl.Domain.Repositories.User;
using MediatR;

namespace LeaveControl.Application.Command.User.CreateUser;

public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, CreateUserCommand.Response>
{
    private readonly IUserRepository _userRepository;
    private readonly IJwtService _jwtService;
    private readonly IUserProjectionRepository _userEmailRepository;

    public CreateUserCommandHandler(IUserRepository userRepository, IJwtService jwtService, IUserProjectionRepository userEmailRepository)
    {
        _userRepository = userRepository;
        _jwtService = jwtService;
        _userEmailRepository = userEmailRepository;
    }

    public async Task<CreateUserCommand.Response> Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        var emailExists = await _userEmailRepository.Contains(request.Email);
        if (emailExists)
        {
            throw AppException.UserWithGivenEmailExists();
        }
        
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