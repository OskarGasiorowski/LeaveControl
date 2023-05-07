using LeaveControl.Api.ActionFilters;
using LeaveControl.Api.Controllers.Calendar.Requests;
using LeaveControl.Application.Command.Calendar.AcceptLeave;
using LeaveControl.Application.Command.Calendar.AddLeave;
using LeaveControl.Application.Command.Calendar.DeclineLeave;
using LeaveControl.Infrastructure.Query.Calendar;
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
    [HttpPost("me/leave")]
    [Authorize(Roles = "Admin,User")]
    public Task Post([FromBody] PostLeaveRequest body, Guid userId)
    {
        return _mediator.Send(new AddLeaveCommand
        {
            Reason = body.Reason,
            UserId = userId,
            LeaveDays = body.Entry.Select(LeaveDayMapper.Map).ToArray(),
        });
    }
    
    [Authorize(Roles = "Admin")]
    [HttpPost("{userId}/leave/{leaveId}/approve")]
    public Task Approve(Guid leaveId, Guid userId)
    {
        return _mediator.Send(new ApproveLeaveCommand
        {
            LeaveId = leaveId,
            UserCalendarId = userId,
        });
    }
    
    [Authorize(Roles = "Admin")]
    [HttpPost("{userId}/leave/{leaveId}/decline")]
    public Task Decline([FromBody] DeclineLeaveRequest body, Guid leaveId, Guid userId)
    {
        return _mediator.Send(new DeclineLeaveCommand
        {
            LeaveId = leaveId,
            UserCalendarId = userId,
            DeclineReason = body.Reason,
        });
    }

    [HttpGet]
    [Authorize(Roles = "Admin,User")]
    public async Task<IActionResult> Get()
    {
        var result = await _mediator.Send(new CalendarQuery());
        return new JsonResult(result);
    }
}