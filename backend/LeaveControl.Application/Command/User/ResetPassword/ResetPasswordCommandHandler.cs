using LeaveControl.Application.Services;
using LeaveControl.Application.Services.Jwt;
using LeaveControl.Application.Services.Jwt.Models;
using LeaveControl.Domain.Repositories;
using LeaveControl.Domain.Types;
using MediatR;

namespace LeaveControl.Application.Command.User.ResetPassword;

public class ResetPasswordCommandHandler: IRequestHandler<ResetPasswordCommand, JwtToken>
{
    private readonly IUserRepository _userRepository;
    private readonly IJwtService _jwtService;

    public ResetPasswordCommandHandler(IUserRepository userRepository, IJwtService jwtService)
    {
        _userRepository = userRepository;
        _jwtService = jwtService;
    }

    public async Task<JwtToken> Handle(ResetPasswordCommand request, CancellationToken cancellationToken)
    {
        var user = await _userRepository.Get(request.UserId);
        user!.ChangePassword(request.Password.GenerateHash());
        user.MakeStandard();
        await _userRepository.Update(user);

        return _jwtService.Create(new CreateTokenModel(
            user.Id, 
            user.Email, 
            user.Role,
            user.TenantId));
    }
}