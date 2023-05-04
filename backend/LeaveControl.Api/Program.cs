using System.Text.Json.Serialization;
using FluentValidation;
using FluentValidation.AspNetCore;
using LeaveControl.Api.Controllers.Calendar.Requests;
using LeaveControl.Application;
using LeaveControl.Application.Command.Calendar.AddLeave;
using LeaveControl.Application.Services.Models;
using LeaveControl.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
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
    .Configure<JwtSettings>(builder.Configuration.GetSection("Jwt"));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();

public partial class Program { }