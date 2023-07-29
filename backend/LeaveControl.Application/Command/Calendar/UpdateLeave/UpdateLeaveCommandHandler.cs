using LeaveControl.Domain;
using LeaveControl.Domain.Aggregates.UserCalendar;
using LeaveControl.Domain.Aggregates.UserCalendar.Models;
using LeaveControl.Domain.Repositories;
using LeaveControl.Domain.Types;
using MediatR;

namespace LeaveControl.Application.Command.Calendar.UpdateLeave;

public class UpdateLeaveCommandHandler : IRequestHandler<UpdateLeaveCommand>
{
    private readonly IRepository<UserCalendarAggregate> _userCalendarRepository;

    public UpdateLeaveCommandHandler(IRepository<UserCalendarAggregate> userCalendarRepository)
    {
        _userCalendarRepository = userCalendarRepository;
    }

    public async Task Handle(UpdateLeaveCommand request, CancellationToken cancellationToken)
    {
        var userCalender = await _userCalendarRepository.Get(request.UserId);

        if (userCalender == null)
        {
            throw AppException.UserCalendarNotFounded();
        }
        
        userCalender.UpdateLeave(new LeaveRequest
        {
            Id = request.LeaveId,
            Reason = request.Reason,
            LeaveDays = new HashSet<LeaveDay>(request.LeaveDays),
        });

        await _userCalendarRepository.Update(userCalender);
    }
}