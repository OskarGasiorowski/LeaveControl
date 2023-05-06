using FluentValidation;

namespace LeaveControl.Api.Controllers.Tenant.Requests;

public record AddUserRequest
{
    public string FirstName { get; init; } = "";
    public string Surname { get; init; } = "";
    public string Email { get; init; } = "";
}

public class AddUserRequestValidator : AbstractValidator<AddUserRequest>
{
    public AddUserRequestValidator()
    {
        RuleFor(x => x.FirstName)
            .NotEmpty()
            .WithMessage("First name is required.")
            .MaximumLength(50)
            .WithMessage("First name must be less than or equal to 50 characters.");

        RuleFor(x => x.Surname)
            .NotEmpty()
            .WithMessage("Surname is required.")
            .MaximumLength(50)
            .WithMessage("Surname must be less than or equal to 50 characters.");

        RuleFor(x => x.Email)
            .NotEmpty()
            .WithMessage("Email is required.")
            .EmailAddress()
            .WithMessage("Email must be a valid email address.");
    }
}