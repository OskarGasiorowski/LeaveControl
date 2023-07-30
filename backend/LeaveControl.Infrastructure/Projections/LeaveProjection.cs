using LeaveControl.Domain.Aggregates.User.Events;
using LeaveControl.Domain.Aggregates.UserCalendar.Events;
using LeaveControl.Domain.Aggregates.UserCalendar.Models;
using LeaveControl.Domain.Types;
using Marten.Events.Projections;
using Marten.Schema;

namespace LeaveControl.Infrastructure.Projections;

public class LeaveProjection
{
    [Identity]
    public Guid Id { get; set; }
    public FirstName FirstName { get; set; }
    public Surname Surname { get; set; }
    public IList<LeaveRequest> Leaves { get; set; } = new List<LeaveRequest>();
    public IList<LeaveRequest> DeclinedLeaves { get; set; } = new List<LeaveRequest>();

    public void Apply(LeaveRequestedEvent @event)
    {
        Leaves.Add(new LeaveRequest
        {
            Id = @event.LeaveId,
            LeaveDays = @event.LeaveDays,
            Reason = @event.Reason,
            LeaveStatus = LeaveStatus.Pending(),
        });
    }
    
    public void Apply(LeaveAutoApprovedEvent @event)
    {
        ApproveLeave(@event.LeaveId);
    }
    
    public void Apply(LeaveApprovedEvent @event)
    {
        ApproveLeave(@event.LeaveId);
    }
    
    public void Apply(LeaveDeclinedEvent @event)
    {
        var leaveRequest = Leaves
            .Single(pending => pending.Id == @event.LeaveId);
        
        DeclinedLeaves.Add(leaveRequest);
        
        Leaves = Leaves
            .Where(pending => pending.Id != @event.LeaveId).ToList();
    }
    
    private void ApproveLeave(LeaveId id)
    {
        var leaveRequest = Leaves
            .Single(pending => pending.Id == id);
        
        leaveRequest.LeaveStatus = LeaveStatus.Accepted();
    }

    public void Apply(UserCalendarCreatedEvent @event)
    {
        Id = @event.UserId;
        DeclinedLeaves = new List<LeaveRequest>();
        Leaves = new List<LeaveRequest>();
    }

    public void Apply(UserCreatedEvent @event)
    {
        FirstName = @event.FirstName;
        Surname = @event.Surname;
    }
    
    public void Apply(UserDataUpdatedEvent @event)
    {
        FirstName = @event.FirstName;
        Surname = @event.Surname;
    }

    public void Apply(LeaveUpdatedEvent @event)
    {
        Leaves = Leaves.Where(leave => leave.Id != @event.LeaveId).ToList();
        
        Leaves.Add(new LeaveRequest
        {
            Id = @event.LeaveId,
            LeaveDays = @event.LeaveDays,
            Reason = @event.Reason,
            LeaveStatus = @event.LeaveStatus
        });
    }
    
    public void Apply(LeaveDeletedEvent @event)
    {
        Leaves = Leaves.Where(leave => leave.Id != @event.LeaveId).ToList();
    }
}

public class LeaveProjectionSetup : MultiStreamProjection<LeaveProjection, Guid>
{
    public LeaveProjectionSetup()
    {
        Identity<IUserEvent>(@event => @event.UserId);

        ProjectEvent<LeaveRequestedEvent>((item, @event) => item.Apply(@event));
        ProjectEvent<LeaveAutoApprovedEvent>((item, @event) => item.Apply(@event));
        ProjectEvent<LeaveApprovedEvent>((item, @event) => item.Apply(@event));
        ProjectEvent<LeaveDeclinedEvent>((item, @event) => item.Apply(@event));
        ProjectEvent<UserCalendarCreatedEvent>((item, @event) => item.Apply(@event));
        ProjectEvent<UserCreatedEvent>((item, @event) => item.Apply(@event));
        ProjectEvent<UserDataUpdatedEvent>((item, @event) => item.Apply(@event));
        ProjectEvent<LeaveUpdatedEvent>((item, @event) => item.Apply(@event));
        ProjectEvent<LeaveDeletedEvent>((item, @event) => item.Apply(@event));
    }
}