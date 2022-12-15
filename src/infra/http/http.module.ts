import { CancelNotification } from "@application/use-cases/cancel-notification";
import { CountRecipientNotification } from "@application/use-cases/count-recipient-notification";
import { GetRecipientNotifications } from "@application/use-cases/get-recipient-notifications";
import { ReadNotification } from "@application/use-cases/read-notification";
import { UnReadNotification } from "@application/use-cases/unread-notification";
import { Module } from "@nestjs/common";
import { SendNotification } from "src/application/use-cases/send-notification";
import { DatabaseModule } from "../database/database.module";
import { NotificationsController } from "./controllers/notifications.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [
    NotificationsController
  ],
  providers: [
    SendNotification,
    CancelNotification,
    ReadNotification,
    UnReadNotification,
    CountRecipientNotification,
    GetRecipientNotifications
  ]
})

export class HttpModule {}