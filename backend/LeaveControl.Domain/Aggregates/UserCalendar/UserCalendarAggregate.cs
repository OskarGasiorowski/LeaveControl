using LeaveControl.Domain.Aggregates.UserCalendar.Events;
using LeaveControl.Domain.Aggregates.UserCalendar.Models;
using LeaveControl.Domain.Types;

namespace LeaveControl.Domain.Aggregates.UserCalendar;

public class UserCalendarAggregate : AggregateRoot<Guid>
{
    public IList<LeaveRequest> LeaveRequests { get; private set; } = new List<LeaveRequest>();
    
    public CalendarSettings Settings { get; private set; }
    
    public UserCalendarAggregate(){}

    private UserCalendarAggregate(UserId id, CalendarSettings settings)
    {
        var @event = new UserCalendarCreatedEvent
        {
            Settings = settings,
            UserId = id,
        };
        
        Enqueue(@event);
        Apply(@event);
    }

    private void Apply(UserCalendarCreatedEvent @event)
    {
        Id = @event.UserId;
        Settings = @event.Settings;
    }

    public void RequestLeave(LeaveRequest leaveRequest)
    {
        var leaveDays = LeaveRequests.SelectMany(r => r.LeaveDays).ToArray();
        
        if (leaveDays.Overlaps(leaveRequest.LeaveDays))
        {
            throw AppException.LeaveDaysOverlaps();
        }

        var leaveDaysTaken = leaveDays.Length + leaveRequest.LeaveDays.Count;
        if (leaveDaysTaken + leaveRequest.LeaveDays.Count > Settings.Allowance && !Settings.AllowanceOverflowAllowed)
        {
            throw AppException.LeaveDaysExceeded(Settings.Allowance);
        }

        var @event = LeaveRequestedEvent.Create(leaveRequest.LeaveDays, leaveRequest.Reason);

        Enqueue(@event);
        Apply(@event);
    }

    private void Apply(LeaveRequestedEvent @event)
    {
        LeaveRequests.Add(new()
        {
            Reason = @event.Reason,
            LeaveDays = @event.LeaveDays,
        });
    }
    
    public static UserCalendarAggregate Create(UserId id, CalendarSettings settings) => new(id, settings);
}