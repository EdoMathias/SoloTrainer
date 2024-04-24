// This is the main process file. It will manage application lifecycle events
//  and IPC communication.
import { app, ipcMain } from 'electron';
import WindowManager from './window';

class MainApp {
  private windowManager: WindowManager;
  constructor() {
    this.windowManager = new WindowManager();
    app.on('ready', this.windowManager.createWindow);
    app.on('window-all-closed', this.handleWindowAllClosed);
    app.on('activate', this.handleActivate);
    ipcMain.on('set-text', this.logText.bind(this));
  }

  private handleWindowAllClosed(): void {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  }

  private handleActivate(): void {
    if (this.windowManager.getMainWindow() === null) {
      this.windowManager.createWindow();
    }
  }

  private logText(event: Electron.IpcMainEvent, message: string): void {
    console.log('Message from renderer:', message);
    event.returnValue = 'Message received successfully';
  }
}

new MainApp();
