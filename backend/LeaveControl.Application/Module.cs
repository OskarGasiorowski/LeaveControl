using LeaveControl.Application.Services;
using LeaveControl.Domain.Aggregates.User.Events;
using Microsoft.Extensions.DependencyInjection;

namespace LeaveControl.Application;

public static class Module
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        return services.AddScoped<IJwtService, JwtService>()
            .AddMediatR(cfg => cfg.RegisterServicesFromAssemblyContaining<UserCreatedEvent>());
    }
}