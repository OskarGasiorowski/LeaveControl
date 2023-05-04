using FluentValidation;

namespace LeaveControl.Api.Controllers.Tenant.Requests;

public record CreateTenantRequest
{
    public int DefaultAllowance { get; init; }
    public bool AcceptanceRequired { get; init; }
    public bool AllowanceOverflowAllowed { get; init; }
    // TODO public holidays option

    public string AdminFirstName { get; init; } = default!;
    public string AdminSurname { get; init; } = default!;
}

public class CreateTenantRequestValidator : AbstractValidator<CreateTenantRequest>
{
    public CreateTenantRequestValidator()
    {
        RuleFor(x => x.DefaultAllowance)
            .GreaterThanOrEqualTo(0)
            .WithMessage("Default allowance must be equal to or greater than 0.")
            .LessThan(365)
            .WithMessage("Default allowance must less than full year.");

        RuleFor(x => x.AdminFirstName)
            .NotEmpty()
            .WithMessage("Admin first name is required.")
            .MaximumLength(50)
            .WithMessage("Admin first name must be less than or equal to 50 characters.");

        RuleFor(x => x.AdminSurname)
            .NotEmpty()
            .WithMessage("Admin surname is required.")
            .MaximumLength(50)
            .WithMessage("Admin surname must be less than or equal to 50 characters.");
    }
}