import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notifications-repository";
import { CountRecipientNotification } from "./count-recipient-notification";

describe('Count Recipient Notification', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const countRecipientNotification = new CountRecipientNotification(notificationsRepository);

    await notificationsRepository.create(
      makeNotification()
    );

    await notificationsRepository.create(
      makeNotification()
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: '321' })
    );

    const { count } = await countRecipientNotification.execute({
      recipientId: '123'
    });
    
    expect(count).toEqual(2);

  })
})