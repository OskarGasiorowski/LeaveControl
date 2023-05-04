// using LeaveControl.Domain.Aggregates.Tenant;
// using LeaveControl.Domain.Aggregates.User;
// using LeaveControl.Domain.Aggregates.User.Models;
// using LeaveControl.Domain.Repositories;
// using MediatR;
//
// namespace LeaveControl.Application.Command.Tenant.CreateTenant;
//
// public class CreateTenantCommandHandler : IRequestHandler<CreateTenantCommand, CreateTenantCommand.Response>
// {
//     private readonly IRepository<UserAggregate> _userRepository;
//     private readonly IRepository<TenantAggregate> _tenantRepository;
//
//     public CreateTenantCommandHandler(IRepository<UserAggregate> userRepository, IRepository<TenantAggregate> tenantRepository)
//     {
//         _userRepository = userRepository;
//         _tenantRepository = tenantRepository;
//     }
//
//     public Task<CreateTenantCommand.Response> Handle(CreateTenantCommand request, CancellationToken cancellationToken)
//     {
//         // TODO for now one user == one tenant, change it in feature
//         var user = UserAggregate.CreateAdmin(new CreateUser
//         {
//             Password = request.AdminPassword.GenerateHash(),
//             Email = request.AdminEmail,
//         });
//         
//         
//     }
// }