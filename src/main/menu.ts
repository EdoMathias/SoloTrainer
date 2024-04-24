// Menu's code goes here:
import { BrowserWindow, Menu, MenuItemConstructorOptions } from 'electron';

class AppMenu {
  private menuItems: MenuItemConstructorOptions[];

  constructor(private mainWindow: BrowserWindow) {
    this.menuItems = [
      {
        label: 'Menu',
        submenu: [
          {
            label: 'Open DevTools',
            click: () => {
              this.mainWindow?.webContents.openDevTools();
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
