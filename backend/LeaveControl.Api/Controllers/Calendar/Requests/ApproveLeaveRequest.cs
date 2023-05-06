using FluentValidation;

namespace LeaveControl.Api.Controllers.Calendar.Requests;

public record DeclineLeaveRequest
{
    public string Reason { get; init; } = "";
}

public class DeclineLeaveRequestValidator : AbstractValidator<DeclineLeaveRequest>
{
    public DeclineLeaveRequestValidator()
    {
        RuleFor(request => request.Reason)
            .MaximumLength(1000)
            .WithMessage("The reason must be no more than 1000 characters long.");
    }
}