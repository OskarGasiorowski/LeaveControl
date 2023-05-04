using LeaveControl.Domain.Aggregates.User;
using LeaveControl.Domain.Repositories;
using LeaveControl.Infrastructure.Repositories;
using Marten;
using Marten.Storage;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
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
            .AddMarten(options =>
            {
                var martenConfig = config.GetRequiredSection(DefaultConfigKey).Get<MartenConfig>();
                
                options.Connection(martenConfig!.ConnectionString);
                options.AutoCreateSchemaObjects = AutoCreate.CreateOrUpdate;
                options.Events.TenancyStyle = TenancyStyle.Conjoined;
                options.Schema.For<UserAggregate>().SingleTenanted();
            })
            .UseLightweightSessions()
            .ApplyAllDatabaseChangesOnStartup();

        services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

        return services;
    }
}
