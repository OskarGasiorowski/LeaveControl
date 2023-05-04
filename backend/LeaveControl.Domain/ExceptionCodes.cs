using LeaveControl.Domain.Types;

namespace LeaveControl.Domain;

public enum AppExceptionType
{
    Fatal,
    User,
    Conflict
}

public class AppException : Exception
{
    public string Code { get; private init; }
    public int CodeNumber { get; private init; }
    public AppExceptionType Type { get; private init; }
    
    private AppException(int codeNumber, string code, AppExceptionType type, string message) : base(message)
    {
        Code = code;
        CodeNumber = codeNumber;
        Type = type;
    }
    
    public static AppException InternalServerError()
        => new AppException(0, "InternalServerError", AppExceptionType.Fatal,
            "An unexpected error occurred. Please try again later or contact our support team.");

    public static AppException UserWithGivenEmailExistsException()
        => new AppException(1, "UserWithGivenEmailExistsException", AppExceptionType.Conflict,
            "User with given email already exists.");
    
    public static AppException LeaveDaysOverlaps()
        => new AppException(2, "LeaveDaysOverlaps", AppExceptionType.User,
            "Leave days cannot overlaps.");
    
    public static AppException LeaveDaysExceeded(Allowance allowance)
        => new AppException(3, "LeaveDaysExceeded", AppExceptionType.User,
            $"Leave days exceeded. Your allowance is {allowance} days.");
}