using Freezbe.Infrastructure.Configurations;
using Microsoft.AspNetCore.Builder;
using Serilog;

namespace Freezbe.Infrastructure.Extensions;

public static class LoggingExtensions
{
    
    public static WebApplicationBuilder UseSerilog(this WebApplicationBuilder builder)
    {
        var dependencyConfiguration = builder.Configuration.GetOptions<DependencyConfiguration>(nameof(DependencyConfiguration));
        builder.Host.UseSerilog((context, configuration) =>
        {
            configuration
            .WriteTo.Console()
            .WriteTo.Seq(dependencyConfiguration.SeqServerAddress);
        });
        return builder;
    }
}