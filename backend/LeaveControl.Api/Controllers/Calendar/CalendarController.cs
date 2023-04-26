using LeaveControl.Api.Controllers.Calendar.Requests;
using LeaveControl.Application.Command.Calendar.AddLeave;
using MediatR;
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

    [HttpPatch("leave")]
    public Task Patch([FromBody] PatchLeaveRequest body)
    {
        return _mediator.Send(new AddLeaveCommand
        {
            Reason = body.Reason,
            UserId = body.UserId,
            LeaveDays = body.Entry.Select(LeaveDayMapper.Map).ToArray(),
        });
    }
}