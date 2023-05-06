using LeaveControl.Application.Services;
using LeaveControl.Domain;
using LeaveControl.Domain.Repositories;
using MediatR;

namespace LeaveControl.Application.Command.User.Authenticate;

public class AuthenticateCommandHandler : IRequestHandler<AuthenticateCommand, AuthenticateCommand.Response>
{
    private readonly IUserRepository _userRepository;
    private readonly IUserEmailRepository _userEmailRepository;
    private readonly IJwtService _jwtService;

    public AuthenticateCommandHandler(IUserRepository userRepository, IUserEmailRepository userEmailRepository, IJwtService jwtService)
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
            Token = _jwtService.Create(user),
            TenantId = user.TenantId,
            UserId = user.Id,
        };
    }
}