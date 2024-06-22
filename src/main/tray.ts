import {
  BrowserWindow,
  Menu,
  Tray,
  MenuItemConstructorOptions,
  app,
} from "electron";
import path from "path";

class AppTray {
  private tray: Tray | null = null;
  private menuItems: MenuItemConstructorOptions[];

  constructor(private mainWindow: BrowserWindow) {
    this.menuItems = [
      {
        label: "Relaunch",
        click: () => {
          app.relaunch();
          app.exit(0);
        },
      },
      {
        label: "Quit",
        click: () => {
          app.quit();
        },
      },
    ];
  }

  public createTray() {
    const trayIcon = path.join(__dirname, "../assets/trayIcon.png"); // Adjust the path as per your file location

    console.log(trayIcon);

    this.tray = new Tray(trayIcon);
    const contextMenu = Menu.buildFromTemplate(this.menuItems);

    this.tray.setToolTip("Electron App");
    this.tray.setContextMenu(contextMenu);
  }
}

export default AppTray;
