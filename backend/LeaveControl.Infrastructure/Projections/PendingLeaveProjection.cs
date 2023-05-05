using LeaveControl.Domain.Aggregates.UserCalendar.Events;
using LeaveControl.Domain.Aggregates.UserCalendar.Models;
using Marten.Events.Aggregation;
using Marten.Schema;

namespace LeaveControl.Infrastructure.Projections;

public class PendingLeaveProjection
{
    [Identity]
    public Guid Id { get; set; }
    public IList<LeaveRequest> Leave { get; set; } = new List<LeaveRequest>();

    public void Apply(LeaveRequestedEvent @event)
    {
        Leave.Add(new LeaveRequest
        {
            Id = @event.LeaveId,
            LeaveDays = @event.LeaveDays,
            Reason = @event.Reason,
        });
    }
}

public class PendingLeaveProjectionSetup : SingleStreamProjection<PendingLeaveProjection>
{
    public PendingLeaveProjectionSetup()
    {
        ProjectEvent<LeaveRequestedEvent>((item, @event) => item.Apply(@event));
    }
}