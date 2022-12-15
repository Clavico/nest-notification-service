import { Notification as RawNotification } from '@prisma/client'
import { Content } from "@application/entities/content";
import { Notification } from "@application/entities/notification";

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      category: notification.category,
      content: notification.content.value,
      recipientId: notification.recipientId,
      createdAt: notification.createdAt,
      readAt: notification.readAt
    }
  }

  static toDomain(raw: RawNotification): Notification {
    return new Notification({
      category: raw.category,
      content: new Content(raw.content),
      recipientId: raw.recipientId,
      createdAt: raw.createdAt,
      canceledAt: raw.canceledAt,
      readAt: raw.readAt
    },
      raw.id
    )
  }
}