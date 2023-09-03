using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using Azure.Identity;
using FluentValidation;
using FluentValidation.AspNetCore;
using LeaveControl.Api;
using LeaveControl.Api.Controllers.Calendar.Requests;
using LeaveControl.Application;
using LeaveControl.Application.Command.Calendar.AddLeave;
using LeaveControl.Application.Services.Jwt.Models;
using LeaveControl.Application.Services.Mailing.MailingProvider.Models;
using LeaveControl.Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using Oakton;

var builder = WebApplication.CreateBuilder(args);

builder.Host.ApplyOaktonExtensions();

builder.Host.ConfigureAppConfiguration((context, config) =>
{
    var url = new Uri("https://leavecontrol-keyvault.vault.azure.net/");
    config.AddAzureKeyVault(url, new DefaultAzureCredential());
});

builder.Services.AddControllers()
    .AddNewtonsoftJson(options =>
    {
        options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
        options.SerializerSettings.Converters.Add(new StringEnumConverter());
    });

builder.Services
    .AddEndpointsApiExplorer()
    .AddSwaggerGen()
    // TODO there is a better way
    .AddMediatR(cfg => cfg.RegisterServicesFromAssemblyContaining<AddLeaveCommand>())
    .AddApplication()
    .AddInfrastructure(builder.Configuration)
    .AddValidatorsFromAssemblyContaining<PostLeaveRequestValidator>()
    .AddFluentValidationAutoValidation()
    .Configure<JwtSettings>(builder.Configuration.GetSection("Jwt"))
    .Configure<MailgunSettings>(builder.Configuration.GetSection("Mailgun"))
    .Configure<AppSettings>(builder.Configuration.GetSection("App"))
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!)),
        };
    })
    .Services
    .AddTransient<IUserAccessor, UserAccessor>()
    .AddHttpContextAccessor();

var app = builder.Build();

app.AddInfrastructure();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors(cors => cors.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

await app.RunOaktonCommands(args);

public partial class Program { }