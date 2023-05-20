using LeaveControl.Domain.Aggregates.User;
using LeaveControl.Domain.Repositories;
using LeaveControl.Domain.Repositories.User;
using LeaveControl.Infrastructure.Projections;
using LeaveControl.Infrastructure.Query.Calendar;
using LeaveControl.Infrastructure.Repositories;
using Marten;
using Marten.Events.Projections;
using Marten.Storage;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Builder;
using Weasel.Core;


namespace LeaveControl.Infrastructure;

public class MartenConfig
{
    private const string DefaultSchema = "public";

    public string ConnectionString { get; set; } = default!;
}

public static class Module
{
    private const string DefaultConfigKey = "EventStore";
    
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration config)
    {
        services
            .AddMediatR(cfg => cfg.RegisterServicesFromAssemblyContaining<CalendarQuery>())
            .AddMarten(options =>
            {
                var martenConfig = config.GetRequiredSection(DefaultConfigKey).Get<MartenConfig>();
                
                options.Connection(martenConfig!.ConnectionString);
                options.AutoCreateSchemaObjects = AutoCreate.CreateOrUpdate;
                options.Events.TenancyStyle = TenancyStyle.Conjoined;
                options.Schema.For<UserAggregate>().SingleTenanted();
                options.Events.EnableGlobalProjectionsForConjoinedTenancy = true;
                
                options.Projections.Add<UsersProjectionSetup>(ProjectionLifecycle.Inline);
                options.Projections.Add<LeaveProjectionSetup>(ProjectionLifecycle.Inline);
            })
            .UseLightweightSessions()
            .BuildSessionsWith<CustomSessionFactory>()
            .ApplyAllDatabaseChangesOnStartup();

        services.AddScoped(typeof(IRepository<>), typeof(Repository<>))
            .AddScoped<IUserProjectionRepository, UserProjectionRepository>()
            .AddScoped<IUserRepository, UserRepository>();

        return services;
    }
    
    public static IApplicationBuilder AddInfrastructure(this IApplicationBuilder app)
    {
        app.UseMiddleware<ExceptionHandlerMiddleware>();

        return app;
    }
}