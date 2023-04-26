using FluentValidation;
using LeaveControl.Domain.Types;

namespace LeaveControl.Api.Controllers.Calendar.Requests;

public enum LeaveEntryType
{
    Full,
    FirstHalf,
    SecondHalf,
}

public record LeaveEntry
{
    public DateTime Date { get; set; }
    public LeaveEntryType Type { get; set; }
}

public record PatchLeaveRequest
{
    public IReadOnlyList<LeaveEntry> Entry { get; set; } = new List<LeaveEntry>();
    public string Reason { get; set; } = "";
    
    // TODO Should be taken from token instead of body
    public Guid UserId { get; set; }
}

public static class LeaveDayMapper
{
    public static LeaveDay Map(this LeaveEntry entry)
    {
        return entry.Type switch
        {
            LeaveEntryType.Full => LeaveDay.Full(entry.Date),
            LeaveEntryType.FirstHalf => LeaveDay.FirstHalf(entry.Date),
            LeaveEntryType.SecondHalf => LeaveDay.SecondHalf(entry.Date),
            _ => throw new ArgumentOutOfRangeException()
        };
    }
}

public class PatchLeaveRequestValidator : AbstractValidator<PatchLeaveRequest>
{
    public PatchLeaveRequestValidator()
    {
        RuleFor(request => request.Entry)
            .NotNull()
            .WithMessage("Entry list cannot be null.")
            .NotEmpty()
            .WithMessage("Entry list cannot be empty.");

        RuleForEach(request => request.Entry)
            .ChildRules(leaveEntryRules =>
            {
                leaveEntryRules.RuleFor(entry => entry.Date)
                    .NotEmpty()
                    .WithMessage("Date in LeaveEntry cannot be default.");

                leaveEntryRules.RuleFor(entry => entry.Type)
                    .IsInEnum()
                    .WithMessage("Invalid LeaveEntryType.");
            });

        RuleFor(request => request.Reason)
            .NotNull()
            .WithMessage("Reason cannot be null.")
            .NotEmpty()
            .WithMessage("Reason cannot be empty.");
    }
}
