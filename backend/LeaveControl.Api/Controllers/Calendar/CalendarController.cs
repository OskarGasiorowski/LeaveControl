using LeaveControl.Api.ActionFilters;
using LeaveControl.Api.Controllers.Calendar.Requests;
using LeaveControl.Application.Command.Calendar.AddLeave;
using LeaveControl.Domain.Types;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LeaveControl.Api.Controllers.Calendar;

[ApiController]
[Route("calendar")]
public class CalendarController : ControllerBase
{
    private readonly IMediator _mediator;

    public CalendarController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [InjectUserId]
    [HttpPatch("leave")]
    [Authorize(Roles = "Admin,User")]
    public Task Patch([FromBody] PatchLeaveRequest body, Guid userId)
    {
        return _mediator.Send(new AddLeaveCommand
        {
            Reason = body.Reason,
            UserId = userId,
            LeaveDays = body.Entry.Select(LeaveDayMapper.Map).ToArray(),
        });
    }
}