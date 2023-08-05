using LeaveControl.Api.ActionFilters;
using LeaveControl.Api.Controllers.Calendar.Requests;
using LeaveControl.Application.Command.Calendar.AcceptLeave;
using LeaveControl.Application.Command.Calendar.AddLeave;
using LeaveControl.Application.Command.Calendar.DeclineLeave;
using LeaveControl.Application.Command.Calendar.DeleteLeave;
using LeaveControl.Application.Command.Calendar.UpdateLeave;
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
    
    [InjectUserId]
    [HttpPut("me/leave/{leaveId}")]
    [Authorize(Roles = "Admin,User")]
    public Task UpdateLeave([FromBody] UpdateLeaveRequest body, Guid userId, Guid leaveId)
    {
        return _mediator.Send(new UpdateLeaveCommand
        {
            Reason = body.Reason,
            UserId = userId,
            LeaveId = leaveId,
            LeaveDays = body.Entry.Select(LeaveDayMapper.Map).ToArray(),
        });
    }
    
    [InjectUserId]
    [HttpDelete("me/leave/{leaveId}")]
    [Authorize(Roles = "Admin,User")]
    public Task DeleteLeave(Guid userId, Guid leaveId)
    {
        return _mediator.Send(new DeleteLeaveCommand(userId, leaveId));
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
    
    [HttpGet("{userId}")]
    [Authorize(Roles = "Admin,User")]
    public async Task<IActionResult> Get(Guid userId)
    {
        var result = await _mediator.Send(new UserCalendarQuery(userId));
        return new JsonResult(result);
    }
    
    [HttpGet("requests")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetRequests()
    {
        var result = await _mediator.Send(new LeaveRequestsListQuery());
        return new JsonResult(result);
    }
}