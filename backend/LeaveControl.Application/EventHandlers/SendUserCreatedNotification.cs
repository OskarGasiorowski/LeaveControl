using System.Diagnostics;
using LeaveControl.Application.Services;
using LeaveControl.Application.Services.Jwt;
using LeaveControl.Application.Services.Jwt.Models;
using LeaveControl.Application.Services.Mailing;
using LeaveControl.Application.Services.Mailing.Models;
using LeaveControl.Domain.Aggregates.User.Events;
using LeaveControl.Domain.Types;
using MediatR;
using Microsoft.Extensions.Options;

namespace LeaveControl.Application.EventHandlers;

public class SendUserCreatedNotification : INotificationHandler<UserCreatedEvent>
{
    private readonly IJwtService _jwtService;
    private readonly IMailingService _mailingService;
    private readonly AppSettings _settings;

    public SendUserCreatedNotification(IJwtService jwtService, IMailingService mailingService, IOptions<AppSettings> settings)
    {
        _jwtService = jwtService;
        _mailingService = mailingService;
        _settings = settings.Value;
    }

    public async Task Handle(UserCreatedEvent notification, CancellationToken cancellationToken)
    {
        if (notification.Role != Role.InvitedUser())
        {
            return;
        }

        var token = _jwtService.Create(
            new CreateTokenModel(
                notification.UserId, 
                notification.Email, 
                Role.InvitedUser(),
                notification.TenantId),
            _settings.UserInvitedLinkExpirationHours
            );

        await _mailingService.InviteUser(
            new InviteUserModel(notification.Email, token)
        );
    }
}
