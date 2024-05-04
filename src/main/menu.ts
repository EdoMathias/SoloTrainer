// Menu's code goes here:
import { BrowserWindow, Menu, MenuItemConstructorOptions } from "electron";
import AppNotification from "./notification";

class AppMenu {
  private menuItems: MenuItemConstructorOptions[];

  constructor(private mainWindow: BrowserWindow) {
    this.menuItems = [
      {
        label: "Menu",
        submenu: [
          {
            label: "Open DevTools",
            click: () => {
              this.mainWindow?.webContents.openDevTools();
            },
          },
          {
            label: "Show Notification",
            click: () => {
              new AppNotification(
                "Hello",
                "This is a notification"
              ).showNotification();
            },
          },
        ],
      },
    ];
  }

  public buildMenu() {
    const menu = Menu.buildFromTemplate(this.menuItems);
    Menu.setApplicationMenu(menu);
  }
}

export default AppMenu;
