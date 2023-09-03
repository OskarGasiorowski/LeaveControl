namespace LeaveControl.Application.Services.Mailing.MailingProvider.Models;

public record SendEmailModel(string From, string To, string Subject, string Content);