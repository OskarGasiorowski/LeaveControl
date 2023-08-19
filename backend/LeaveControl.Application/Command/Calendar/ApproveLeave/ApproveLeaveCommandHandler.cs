using LeaveControl.Domain;
using LeaveControl.Domain.Aggregates.UserCalendar;
using LeaveControl.Domain.Repositories;
using MediatR;

namespace LeaveControl.Application.Command.Calendar.ApproveLeave;

public class ApproveLeaveCommandHandler : IRequestHandler<ApproveLeaveCommand>
{
    private readonly IRepository<UserCalendarAggregate> _userCalendarRepository;

    public ApproveLeaveCommandHandler(IRepository<UserCalendarAggregate> userCalendarRepository)
    {
        _userCalendarRepository = userCalendarRepository;
    }

    public async Task Handle(ApproveLeaveCommand request, CancellationToken cancellationToken)
    {
        var userCalendar = await _userCalendarRepository.Get(request.UserCalendarId);
        if (userCalendar == null)
        {
            throw AppException.UserCalendarNotFounded();
        }
        
        userCalendar.ApproveLeaveRequest(request.LeaveId);
        await _userCalendarRepository.Update(userCalendar);
    }
}