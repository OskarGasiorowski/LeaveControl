using LeaveControl.Domain;
using LeaveControl.Domain.Aggregates.UserCalendar;
using LeaveControl.Domain.Repositories;
using MediatR;

namespace LeaveControl.Application.Command.Calendar.DeleteLeave;

public class DeleteLeaveCommandHandler : IRequestHandler<DeleteLeaveCommand>
{
    private readonly IRepository<UserCalendarAggregate> _userCalendarRepository;

    public DeleteLeaveCommandHandler(IRepository<UserCalendarAggregate> userCalendarRepository)
    {
        _userCalendarRepository = userCalendarRepository;
    }

    public async Task Handle(DeleteLeaveCommand request, CancellationToken cancellationToken)
    {
        var userCalendar = await _userCalendarRepository.Get(request.UserId);
        if (userCalendar == null)
        {
            throw AppException.UserCalendarNotFounded();
        }
        
        userCalendar.DeleteLeaveRequest(request.LeaveId);

        await _userCalendarRepository.Update(userCalendar);
    }
}