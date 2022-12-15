import { Injectable } from "@nestjs/common";
import { Notification } from "../../../../application/entities/notification";
import { NotificationsRepository } from "../../../../application/repositories/notifications-repository";
import { PrismaNotificationMapper } from "../mappers/prisma-notification-mapper";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaNotificationRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) { }

  async findById(notificationId: string): Promise<Notification | null> {
    const rawNotification = await this.prismaService.notification.findUnique({
      where: {
        id: notificationId
      }
    });

    if (!rawNotification) {
      return null;
    }

    return PrismaNotificationMapper.toDomain(rawNotification);
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prismaService.notification.count({
      where: {
        recipientId
      }
    });

    return count;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notificationsRaw = await this.prismaService.notification.findMany({
      where: {
        recipientId
      }
    });

    return notificationsRaw.map(PrismaNotificationMapper.toDomain);
  }

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.create({
      data: raw
    });
  }

  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);
    await this.prismaService.notification.update({
      where: {
        id: raw.id
      },
      data: raw
    });
  }
}
