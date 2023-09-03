using LeaveControl.Application.Services;
using LeaveControl.Application.Services.Jwt;
using LeaveControl.Application.Services.Mailing;
using LeaveControl.Application.Services.Mailing.MailingProvider;
using LeaveControl.Domain.Aggregates.User.Events;
using Microsoft.Extensions.DependencyInjection;

namespace LeaveControl.Application;

public static class Module
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        return services.AddScoped<IJwtService, JwtService>()
            .AddScoped<IMailingProvider, MailgunProvider>()
            .AddScoped<IMailingService, MailingService>()
            .AddMediatR(cfg => cfg.RegisterServicesFromAssemblyContaining<UserCreatedEvent>());
    }
}