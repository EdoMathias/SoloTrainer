import { Notification } from "electron";
import { NotificationConstructorOptions } from "electron/main";

class AppNotification {
  private notificationOptions: NotificationConstructorOptions;

  constructor(title: string, body: string) {
    this.notificationOptions = {
      title: title,
      body: body,
    };
  }

  public showNotification() {
    const notification = new Notification(this.notificationOptions);
    notification.show();
  }
}

export default AppNotification;
