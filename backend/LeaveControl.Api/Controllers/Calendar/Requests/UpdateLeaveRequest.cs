using FluentValidation;

namespace LeaveControl.Api.Controllers.Calendar.Requests;

public record UpdateLeaveRequest
{
    public IReadOnlyList<LeaveEntry> Entry { get; set; } = new List<LeaveEntry>();
    public string Reason { get; set; } = "";
}

public class UpdateLeaveRequestValidator : AbstractValidator<UpdateLeaveRequest>
{
    public UpdateLeaveRequestValidator()
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
                    .NotNull()
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