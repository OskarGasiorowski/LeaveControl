using LeaveControl.Application.Services;
using LeaveControl.Application.Services.Jwt;
using LeaveControl.Application.Services.Jwt.Models;
using LeaveControl.Domain;
using LeaveControl.Domain.Repositories;
using LeaveControl.Domain.Repositories.User;
using MediatR;

namespace LeaveControl.Application.Command.User.Authenticate;

public class AuthenticateCommandHandler : IRequestHandler<AuthenticateCommand, AuthenticateCommand.Response>
{
    private readonly IUserRepository _userRepository;
    private readonly IUserProjectionRepository _userEmailRepository;
    private readonly IJwtService _jwtService;

    public AuthenticateCommandHandler(IUserRepository userRepository, IUserProjectionRepository userEmailRepository, IJwtService jwtService)
    {
        _userRepository = userRepository;
        _userEmailRepository = userEmailRepository;
        _jwtService = jwtService;
    }

    public async Task<AuthenticateCommand.Response> Handle(AuthenticateCommand request, CancellationToken cancellationToken)
    {
        var userId = await _userEmailRepository.GetId(request.Email);
        if (userId == null)
        {
            throw AppException.InvalidCredentials();
        }

        var user = await _userRepository.Get(userId.Value);
        if (!user!.Password.Verify(request.Password))
        {
            throw AppException.InvalidCredentials();
        }

        return new AuthenticateCommand.Response
        {
            Token = _jwtService.Create(new CreateTokenModel(
                user.Id, 
                user.Email, 
                user.Role,
                user.TenantId)),
            TenantId = user.TenantId,
            UserId = user.Id,
        };
    }
}