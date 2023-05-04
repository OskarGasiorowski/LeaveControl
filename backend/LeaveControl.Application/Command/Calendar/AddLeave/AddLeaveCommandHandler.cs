using LeaveControl.Domain.Aggregates.UserCalendar;
using LeaveControl.Domain.Repositories;
using LeaveControl.Domain.Types;
using MediatR;

namespace LeaveControl.Application.Command.Calendar.AddLeave;

public class AddLeaveCommandHandler : IRequestHandler<AddLeaveCommand>
{
    private readonly IRepository<UserCalendarAggregate> _userCalendarRepository;

    public AddLeaveCommandHandler(IRepository<UserCalendarAggregate> userCalendarRepository)
    {
        _userCalendarRepository = userCalendarRepository;
    }

    public async Task Handle(AddLeaveCommand request, CancellationToken cancellationToken)
    {
        var userCalendar = await _userCalendarRepository.Get(request.UserId) 
                           ?? UserCalendarAggregate.Create(request.UserId);

        userCalendar.RequestLeave(new LeaveRequest
        {
            Reason = request.Reason,
            LeaveDays = new HashSet<LeaveDay>(request.LeaveDays),
        });

        await _userCalendarRepository.Update(userCalendar);
    }
}