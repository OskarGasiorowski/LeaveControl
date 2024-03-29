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

public record PostLeaveRequest
{
    public IReadOnlyList<LeaveEntry> Entry { get; set; } = new List<LeaveEntry>();
    public string Reason { get; set; } = "";
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

public class PostLeaveRequestValidator : AbstractValidator<PostLeaveRequest>
{
    public PostLeaveRequestValidator()
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
            .MaximumLength(1000)
            .WithMessage("The reason must be no more than 1000 characters long.");
    }
}