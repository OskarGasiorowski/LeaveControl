using LeaveControl.Domain.Repositories;
using LeaveControl.Infrastructure.Repositories;
using Marten;
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
        var martenConfig = config.GetRequiredSection(DefaultConfigKey).Get<MartenConfig>();
        var options = new StoreOptions();
        options.Connection(martenConfig!.ConnectionString);
        options.AutoCreateSchemaObjects = AutoCreate.CreateOrUpdate;

        services
            .AddMarten(_ => options)
            .UseLightweightSessions()
            .ApplyAllDatabaseChangesOnStartup();

        services.AddTransient<IUserCalendarRepository, UserCalendarRepository>();

        return services;
    }
}