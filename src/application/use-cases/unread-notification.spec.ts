import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notifications-repository";
import { NotificationNotFound } from "./errors/notification-not-found";
import { UnReadNotification } from "./unread-notification";

describe('Unread Notification', () => {
  it('should be able to UnRead a notification', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const unReadNotification = new UnReadNotification(notificationsRepository);

    const notification = makeNotification({readAt: new Date()});
    await notificationsRepository.create(notification);

    await unReadNotification.execute({
      notificationId: notification.id
    });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  })

  it('should not be able to UnRead a notification when it does not exist', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const unReadNotification = new UnReadNotification(notificationsRepository);

    expect(() => {
      return unReadNotification.execute({
        notificationId: '123'
      });
    }).rejects.toThrow(NotificationNotFound)
  })

})