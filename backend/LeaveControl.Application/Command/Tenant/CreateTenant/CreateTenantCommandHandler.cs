using LeaveControl.Application.Services;
using LeaveControl.Application.Services.Jwt;
using LeaveControl.Application.Services.Jwt.Models;
using LeaveControl.Domain.Aggregates.Tenant;
using LeaveControl.Domain.Aggregates.Tenant.Models;
using LeaveControl.Domain.Aggregates.User;
using LeaveControl.Domain.Aggregates.User.Models;
using LeaveControl.Domain.Aggregates.UserCalendar;
using LeaveControl.Domain.Aggregates.UserCalendar.Models;
using LeaveControl.Domain.Repositories;
using MediatR;

namespace LeaveControl.Application.Command.Tenant.CreateTenant;

public class CreateTenantCommandHandler : IRequestHandler<CreateTenantCommand, CreateTenantCommand.Response>
{
    private readonly IUserRepository _userRepository;
    private readonly IRepository<TenantAggregate> _tenantRepository;
    private readonly IRepository<UserCalendarAggregate> _userCalendarRepository;
    private readonly IJwtService _jwtService;

    public CreateTenantCommandHandler(
        IUserRepository userRepository,
        IRepository<TenantAggregate> tenantRepository,
        IJwtService jwtService,
        IRepository<UserCalendarAggregate> userCalendarRepository)
    {
        _userRepository = userRepository;
        _tenantRepository = tenantRepository;
        _jwtService = jwtService;
        _userCalendarRepository = userCalendarRepository;
    }

    public async Task<CreateTenantCommand.Response> Handle(CreateTenantCommand request, CancellationToken cancellationToken)
    {
        var tenant = TenantAggregate.New(
            request.TenantId,
            new TenantSettings
            {
                AcceptanceRequired = request.AcceptanceRequired,
                DefaultAllowance = request.DefaultAllowance,
                AllowanceOverflowAllowed = request.AllowanceOverflowAllowed,
            },
            request.UserId
        );
        await _tenantRepository.Create(tenant);
        
        var user = await _userRepository.Get(request.UserId);
        user!.MakeAdmin();
        user.Update(request.AdminFirstName, request.AdminSurname);
        await _userRepository.Update(user);

        var calendar = UserCalendarAggregate.New(
            request.UserId,
            new CalendarSettings
            {
                AcceptanceRequired = request.AcceptanceRequired,
                AllowanceOverflowAllowed = request.AllowanceOverflowAllowed,
                Allowance = request.DefaultAllowance,
            }
        );
        await _userCalendarRepository.Create(calendar);

        return new() {
            Token = _jwtService.Create(new CreateTokenModel(
                user.Id, 
                user.Email, 
                user.Role,
                user.TenantId)) 
        };
    }
}