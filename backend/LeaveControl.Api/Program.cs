using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using FluentValidation;
using FluentValidation.AspNetCore;
using LeaveControl.Api;
using LeaveControl.Api.Controllers.Calendar.Requests;
using LeaveControl.Application;
using LeaveControl.Application.Command.Calendar.AddLeave;
using LeaveControl.Application.Services.Models;
using LeaveControl.Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

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
    .AddValidatorsFromAssemblyContaining<PatchLeaveRequestValidator>()
    .AddFluentValidationAutoValidation()
    .Configure<JwtSettings>(builder.Configuration.GetSection("Jwt"))
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

app.Run();

public partial class Program { }