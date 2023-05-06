using LeaveControl.Domain;
using LeaveControl.Domain.Aggregates.UserCalendar;
using LeaveControl.Domain.Repositories;
using MediatR;

namespace LeaveControl.Application.Command.Calendar.DeclineLeave;

public class DeclineLeaveCommandHandler : IRequestHandler<DeclineLeaveCommand>
{
    private readonly IRepository<UserCalendarAggregate> _userRepository;

    public DeclineLeaveCommandHandler(IRepository<UserCalendarAggregate> userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task Handle(DeclineLeaveCommand request, CancellationToken cancellationToken)
    {
        var userCalendar = await _userRepository.Get(request.UserCalendarId);
        if (userCalendar == null)
        {
            throw AppException.UserCalendarNotFounded();
        }

        userCalendar.DeclineLeaveRequest(request.LeaveId, request.DeclineReason);
        await _userRepository.Update(userCalendar);
    }
}