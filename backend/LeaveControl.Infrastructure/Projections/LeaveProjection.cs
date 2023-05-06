using LeaveControl.Domain.Aggregates.UserCalendar.Events;
using LeaveControl.Domain.Aggregates.UserCalendar.Models;
using LeaveControl.Domain.Types;
using Marten.Events.Aggregation;
using Marten.Schema;

namespace LeaveControl.Infrastructure.Projections;

public class LeaveProjection
{
    [Identity]
    public Guid Id { get; set; }
    public IList<LeaveRequest> PendingLeaves { get; set; } = new List<LeaveRequest>();
    public IList<LeaveRequest> Leaves { get; set; } = new List<LeaveRequest>();
    public IList<LeaveRequest> DeclinedLeaves { get; set; } = new List<LeaveRequest>();

    public void Apply(LeaveRequestedEvent @event)
    {
        DeclinedLeaves.Add(new LeaveRequest
        {
            Id = @event.LeaveId,
            LeaveDays = @event.LeaveDays,
            Reason = @event.Reason,
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
        
        Leaves.Add(leaveRequest);
        
        Leaves = Leaves
            .Where(pending => pending.Id != id).ToList();
    }
}

public class LeaveProjectionSetup : SingleStreamProjection<LeaveProjection>
{
    public LeaveProjectionSetup()
    {
        ProjectEvent<LeaveRequestedEvent>((item, @event) => item.Apply(@event));
        ProjectEvent<LeaveAutoApprovedEvent>((item, @event) => item.Apply(@event));
        ProjectEvent<LeaveApprovedEvent>((item, @event) => item.Apply(@event));
        ProjectEvent<LeaveDeclinedEvent>((item, @event) => item.Apply(@event));
    }
}