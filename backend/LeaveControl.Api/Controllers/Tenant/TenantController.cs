using LeaveControl.Api.ActionFilters;
using LeaveControl.Api.Controllers.Tenant.Requests;
using LeaveControl.Application.Command.Tenant.AddUser;
using LeaveControl.Application.Command.Tenant.CreateTenant;
using LeaveControl.Infrastructure.Query.User;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LeaveControl.Api.Controllers.Tenant;

[ApiController]
[Route("tenant")]
public class TenantController : ControllerBase
{
    private readonly IMediator _mediator;

    public TenantController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    [InjectUserId]
    [Authorize(Roles = "IncompleteAdmin")]
    public async Task<IActionResult> Post([FromBody] CreateTenantRequest body, Guid userId)
    {
        var result = await _mediator.Send(new CreateTenantCommand
        {
            AllowanceOverflowAllowed = body.AllowanceOverflowAllowed,
            DefaultAllowance = body.DefaultAllowance,
            AcceptanceRequired = body.AcceptanceRequired,
            AdminSurname = body.AdminSurname,
            AdminFirstName = body.AdminFirstName,
            UserId = userId,
        });

        return Ok(result.Token.ToString());
    }

    [InjectTenantId]
    [Authorize(Roles = "Admin")]
    [HttpPost("current/users")]
    public async Task<IActionResult> Post([FromBody] AddUserRequest body, Guid tenantId)
    {
        var response = await _mediator.Send(new AddUserCommand
        {
            TenantId = tenantId,
            Email = body.Email,
            Surname = body.Surname,
            FirstName = body.FirstName,
        });

        return new JsonResult(response);
    }
    
    // TODO think if this is right place and if only admin should have access to it
    [Authorize(Roles = "Admin")]
    [HttpGet("current/users")]
    public async Task<IActionResult> Get()
    {
        var response = await _mediator.Send(new UsersQuery());
        return new JsonResult(response);
    }
}