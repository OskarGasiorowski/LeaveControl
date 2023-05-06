using System.Net;
using LeaveControl.Api.Controllers.Auth.Requests;
using LeaveControl.Application.Command.User.Authenticate;
using LeaveControl.Application.Command.User.CreateUser;
using LeaveControl.Application.Command.User.ResetPassword;
using LeaveControl.Domain.Types;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LeaveControl.Api.Controllers.Auth;

[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{
    private readonly IMediator _mediator;

    public AuthController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("register")]
    public async Task<RegisterRequest.Response> Register([FromBody] RegisterRequest body)
    {
        var response = await _mediator.Send(new CreateUserCommand
        {
            Email = body.AdminEmail,
            Password = body.AdminPassword,
            Role = Role.IncompleteAdmin(),
        });

        // TODO introduce better way of doing that - custom IActionResult
        Response.StatusCode = (int)HttpStatusCode.Created;
        return new RegisterRequest.Response
        {
            Token = response.Token,
            UserId = response.UserId,
            TenantId = response.TenantId
        };
    }

    [HttpPost]
    public async Task<IActionResult> Login([FromBody] LoginRequest body)
    {
        var response = await _mediator.Send(new AuthenticateCommand
        {
            Email = body.Email,
            Password = body.Password,
        });

        return new JsonResult(response);
    }

    [Authorize(Roles = "InvitedUser")]
    [HttpPatch("me/reset-password")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest body, Guid userId)
    {
        var token = await _mediator.Send(new ResetPasswordCommand
        {
            UserId = userId,
            Password = body.Password,
        });
        return Ok(token);
    }
}