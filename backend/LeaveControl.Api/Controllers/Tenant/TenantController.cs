using LeaveControl.Api.ActionFilters;
using LeaveControl.Api.Controllers.Tenant.Requests;
using LeaveControl.Application.Command.Tenant.CreateTenant;
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
    [Authorize(Roles = "IncompleteAdmin")]
    [InjectUserId]
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
}