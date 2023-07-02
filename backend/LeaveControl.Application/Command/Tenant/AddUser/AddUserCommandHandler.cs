using LeaveControl.Domain;
using LeaveControl.Domain.Aggregates.Tenant;
using LeaveControl.Domain.Aggregates.User;
using LeaveControl.Domain.Aggregates.User.Models;
using LeaveControl.Domain.Repositories;
using LeaveControl.Domain.Repositories.User;
using LeaveControl.Domain.Types;
using MediatR;

namespace LeaveControl.Application.Command.Tenant.AddUser;

public class AddUserCommandHandler : IRequestHandler<AddUserCommand, AddUserCommand.Response>
{
    private readonly IUserRepository _userRepository;
    private readonly IUserProjectionRepository _userEmailRepository;
    private readonly IRepository<TenantAggregate> _tenantRepository;

    public AddUserCommandHandler(IUserRepository userRepository, IUserProjectionRepository userEmailRepository, IRepository<TenantAggregate> tenantRepository)
    {
        _userRepository = userRepository;
        _userEmailRepository = userEmailRepository;
        _tenantRepository = tenantRepository;
    }

    public async Task<AddUserCommand.Response> Handle(AddUserCommand request, CancellationToken cancellationToken)
    {
        var emailExists = await _userEmailRepository.Contains(request.Email);
        if (emailExists)
        {
            throw AppException.UserWithGivenEmailExists();
        }

        var createUser = new CreateUser
        {
            Email = request.Email,
            Password = Password.Random().GenerateHash(),
            Surname = request.Surname,
            FirstName = request.FirstName,
        };
        var user = UserAggregate.CreateStandard(createUser, request.TenantId);
        
        var tenant = await _tenantRepository.Get(request.TenantId);
        tenant!.AddUser(user.Id);

        // TODO notify user with access token
        await _tenantRepository.Update(tenant);
        await _userRepository.Create(user);

        return new AddUserCommand.Response
        {
            UserId = user.Id,
        };
    }
}