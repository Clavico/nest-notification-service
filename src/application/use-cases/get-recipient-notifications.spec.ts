import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notifications-repository";
import { GetRecipientNotifications } from "./get-recipient-notifications";

describe('Get Recipient Notification', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const getRecipientNotification = new GetRecipientNotifications(notificationsRepository);

    await notificationsRepository.create(
      makeNotification()
    );

    await notificationsRepository.create(
      makeNotification()
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: '321' })
    );

    const { notifications } = await getRecipientNotification.execute({
      recipientId: '123'
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(expect.arrayContaining([
      expect.objectContaining({ recipientId: '123' }),
      expect.objectContaining({ recipientId: '123' }),
    ]));
  })
})