using System.Diagnostics;
using LeaveControl.Application.Services;
using LeaveControl.Application.Services.Models;
using LeaveControl.Domain.Aggregates.User.Events;
using LeaveControl.Domain.Types;
using MediatR;

namespace LeaveControl.Application.EventHandlers;

public class SendUserCreatedNotification : INotificationHandler<UserCreatedEvent>
{
    private readonly IJwtService _jwtService;

    public SendUserCreatedNotification(IJwtService jwtService)
    {
        _jwtService = jwtService;
    }

    public Task Handle(UserCreatedEvent notification, CancellationToken cancellationToken)
    {
        if (notification.Role != Role.InvitedUser())
        {
            return Task.CompletedTask;
        }

        var token = _jwtService.Create(new CreateTokenModel(
            notification.UserId, 
            notification.Email, 
            Role.InvitedUser(),
            notification.TenantId));
        
        Debug.WriteLine(token);

        return Task.CompletedTask;
    }
}
