using FluentValidation;

namespace LeaveControl.Api.Controllers.Auth.Requests;

public record RegisterRequest
{
    public string AdminEmail { get; init; } = default!;
    public string AdminPassword { get; init; } = default!;

    public record Response
    {
        public string Token { get; init; } = default!;
        public Guid UserId { get; init; } = default!;
        public Guid TenantId { get; init; } = default!;
    }
}

public class RegisterRequestValidator : AbstractValidator<RegisterRequest>
{
    public RegisterRequestValidator()
    {
        RuleFor(x => x.AdminEmail)
            .NotEmpty().WithMessage("Admin email is required.")
            .EmailAddress().WithMessage("Admin email must be a valid email address.");

        RuleFor(x => x.AdminPassword)
            .NotEmpty().WithMessage("Admin password is required.")
            .MinimumLength(8).WithMessage("Admin password must be at least 8 characters long.");
    }
}