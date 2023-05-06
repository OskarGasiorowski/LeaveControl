using LeaveControl.Domain.Aggregates.UserCalendar.Events;
using LeaveControl.Domain.Aggregates.UserCalendar.Models;
using Marten.Events.Aggregation;
using Marten.Schema;

namespace LeaveControl.Infrastructure.Projections;

public class LeaveProjection
{
    [Identity]
    public Guid Id { get; set; }
    public IList<LeaveRequest> PendingLeaves { get; set; } = new List<LeaveRequest>();
    public IList<LeaveRequest> Leaves { get; set; } = new List<LeaveRequest>();

    public void Apply(LeaveRequestedEvent @event)
    {
        PendingLeaves.Add(new LeaveRequest
        {
            Id = @event.LeaveId,
            LeaveDays = @event.LeaveDays,
            Reason = @event.Reason,
        });
    }
}

public class LeaveProjectionSetup : SingleStreamProjection<LeaveProjection>
{
    public LeaveProjectionSetup()
    {
        ProjectEvent<LeaveRequestedEvent>((item, @event) => item.Apply(@event));
    }
}