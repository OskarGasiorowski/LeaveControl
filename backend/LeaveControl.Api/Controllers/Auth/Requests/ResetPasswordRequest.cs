using FluentValidation;

namespace LeaveControl.Api.Controllers.Auth.Requests;

public record ResetPasswordRequest
{
    public string Password { get; init; } = "";
}

public class ResetPasswordRequestValidator : AbstractValidator<ResetPasswordRequest>
{
    public ResetPasswordRequestValidator()
    {
        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Password is required.")
            .MinimumLength(8).WithMessage("Password must be at least 8 characters long.");
    }
}