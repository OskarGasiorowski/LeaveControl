using LeaveControl.Domain.Aggregates.UserCalendar.Events;
using LeaveControl.Domain.Aggregates.UserCalendar.Models;
using LeaveControl.Domain.Types;

namespace LeaveControl.Domain.Aggregates.UserCalendar;

public class UserCalendarAggregate : AggregateRoot<Guid>
{
    public IList<LeaveRequest> LeaveRequests { get; private set; } = new List<LeaveRequest>();
    public IList<LeaveRequest> PendingLeaveRequests { get; private set; } = new List<LeaveRequest>();
    public IList<LeaveRequest> DeclinedLeaveRequests { get; private set; } = new List<LeaveRequest>();
    
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
    
    public static UserCalendarAggregate New(UserId id, CalendarSettings settings) => new(id, settings);

    private void Apply(UserCalendarCreatedEvent @event)
    {
        Id = @event.UserId;
        Settings = @event.Settings;
    }

    public void RequestLeave(LeaveRequest leaveRequest)
    {
        leaveRequest.Id = LeaveId.Generate();
        var leaveDays = LeaveRequests.SelectMany(r => r.LeaveDays).ToArray();
        
        if (leaveDays.Overlaps(leaveRequest.LeaveDays))
        {
            throw AppException.LeaveDaysOverlaps();
        }

        // TODO this is not right, we should calculate allowance only for requested year!
        var leaveDaysTaken = leaveDays.Length + leaveRequest.LeaveDays.Count;
        if (leaveDaysTaken + leaveRequest.LeaveDays.Count > Settings.Allowance && !Settings.AllowanceOverflowAllowed)
        {
            throw AppException.LeaveDaysExceeded(Settings.Allowance);
        }

        var @event = new LeaveRequestedEvent
        {
            LeaveId = leaveRequest.Id, 
            LeaveDays = leaveRequest.LeaveDays, 
            Reason = leaveRequest.Reason
        };

        Enqueue(@event);
        Apply(@event);

        if (Settings.AcceptanceRequired) 
            return;
        
        var autoApprovedEvent = new LeaveAutoApprovedEvent { LeaveId = leaveRequest.Id };
        Enqueue(autoApprovedEvent);
        Apply(autoApprovedEvent);
    }
    
    private void Apply(LeaveAutoApprovedEvent @event)
    {
        ApproveLeave(@event.LeaveId);
    }

    private void Apply(LeaveRequestedEvent @event)
    {
        PendingLeaveRequests.Add(new()
        {
            Id = @event.LeaveId,
            Reason = @event.Reason,
            LeaveDays = @event.LeaveDays,
        });
    }

    public void ApproveLeaveRequest(LeaveId id)
    {
        var leaveRequest = PendingLeaveRequests.SingleOrDefault(pending => pending.Id == id);
        if (leaveRequest == null)
        {
            throw AppException.LeaveRequestNotFounded();
        }
        
        var @event = new LeaveApprovedEvent
        {
            LeaveId = id,
        };
        
        Enqueue(@event);
        Apply(@event);
    }

    private void Apply(LeaveApprovedEvent @event)
    {
        ApproveLeave(@event.LeaveId);
    }
    
    public void DeclineLeaveRequest(LeaveId id, Reason reason)
    {
        var leaveRequest = PendingLeaveRequests.SingleOrDefault(pending => pending.Id == id);
        if (leaveRequest == null)
        {
            throw AppException.LeaveRequestNotFounded();
        }

        var @event = new LeaveDeclinedEvent
        {
            LeaveId = id,
            DeclineReason = reason,
        };
        
        Enqueue(@event);
        Apply(@event);
    }

    private void Apply(LeaveDeclinedEvent @event)
    {
        var leaveRequest = PendingLeaveRequests
            .Single(pending => pending.Id == @event.LeaveId);
        
        DeclinedLeaveRequests.Add(leaveRequest);
        
        PendingLeaveRequests = PendingLeaveRequests
            .Where(pending => pending.Id != @event.LeaveId).ToList();
    }

    private void ApproveLeave(LeaveId id)
    {
        var leaveRequest = PendingLeaveRequests
            .SingleOrDefault(pending => pending.Id == id);
        
        LeaveRequests.Add(leaveRequest);
        
        PendingLeaveRequests = PendingLeaveRequests
            .Where(pending => pending.Id != id).ToList();
    }
}