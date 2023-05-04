using LeaveControl.Api.Controllers.Tenant.Requests;
using LeaveControl.Application.Command.Tenant.CreateTenant;
using MediatR;
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
    public async Task Post([FromBody] PostTenantRequest body)
    {
        await _mediator.Send(new CreateTenantCommand
        {
            AdminEmail = body.AdminEmail,
            AdminPassword = body.AdminPassword
        });
    }
}