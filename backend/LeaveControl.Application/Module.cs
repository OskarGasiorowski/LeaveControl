using LeaveControl.Application.Services;
using Microsoft.Extensions.DependencyInjection;

namespace LeaveControl.Application;

public static class Module
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        return services.AddScoped<IJwtService, JwtService>();
    }
}