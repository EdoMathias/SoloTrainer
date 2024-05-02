// This is the main process file. It will manage application lifecycle events
//  and IPC communication.
import { app, ipcMain } from "electron";
import WindowManager from "./window";
import Store from "electron-store";
import ExerciseModel from "../models/exercise-model";
import AppNotification from "./notification";

class MainApp {
  private windowManager: WindowManager;
  private store: Store;
  constructor() {
    this.windowManager = new WindowManager();
    this.store = new Store();
    app.on("ready", this.windowManager.createWindow);
    app.on("window-all-closed", this.handleWindowAllClosed);
    app.on("activate", this.handleActivate);
    ipcMain.on("set-exercises", this.storeExercises.bind(this));
    ipcMain.handle("get-exercises", this.getExercises.bind(this));
    ipcMain.on("timer-complete", this.showNotification);
  }

  private handleWindowAllClosed(): void {
    if (process.platform !== "darwin") {
      app.quit();
    }
  }

  private handleActivate(): void {
    if (this.windowManager.getMainWindow() === null) {
      this.windowManager.createWindow();
    }
  }

  private storeExercises(event: Electron.IpcMainEvent, exercises: any): void {
    this.store.set("exercises", exercises);
  }

  private getExercises(event: Electron.IpcMainEvent) {
    const exercises = this.store.get("exercises");
    console.log("Exercises from store:", exercises);
    return exercises;
  }

  private showNotification(): void {
    new AppNotification("Timer finished", "GET TO WORK!").showNotification();
  }
}

new MainApp();
