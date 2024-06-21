// This is the main process file. It will manage application lifecycle events
//  and IPC communication.
import { app, ipcMain } from 'electron';
import WindowManager from './window';
import Store from 'electron-store';
import ExerciseModel from '../models/exercise-model';
import AppNotification from './notification';
import TimerModel from '../models/timer-model';
import GetTimerModel from '../models/getTimer-model';

class MainApp {
  private windowManager: WindowManager;
  private store: Store;
  constructor() {
    this.windowManager = new WindowManager();
    this.store = new Store();
    app.on('ready', this.windowManager.createWindow);
    app.on('window-all-closed', this.handleWindowAllClosed);
    app.on('activate', this.handleActivate);
    ipcMain.on('set-exercises', this.setExercises.bind(this));
    ipcMain.handle('get-exercises', this.getExercises.bind(this));
    ipcMain.on('set-timer', this.setTimer.bind(this));
    ipcMain.handle('get-timer', this.getTimer.bind(this));
    ipcMain.on('timer-complete', this.timerCompleteNotification);
    ipcMain.on(
      'exercise-complete',
      this.exerciseCompleteNotification.bind(this)
    );
    ipcMain.on('all-exercises-complete', this.allExercisesCompleteNotification);
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

  private setExercises(event: Electron.IpcMainEvent, exercises: any): void {
    this.store.set('exercises', exercises);
  }

  private getExercises(event: Electron.IpcMainEvent) {
    const exercises = this.store.get('exercises');

    if (!exercises) {
      return null;
    }

    return exercises;
  }

  private setTimer(event: Electron.IpcMainEvent, timer: TimerModel): void {
    this.store.set('timer', timer);
  }

  private getTimer(_event: Electron.IpcMainEvent) {
    const timer = this.store.get('timer') as GetTimerModel;

    if (!timer) {
      return null;
    }

    const convertedTimer = {
      hours: parseInt(timer.hours),
      minutes: parseInt(timer.minutes),
      seconds: parseInt(timer.seconds),
    };

    return convertedTimer;
  }

  private timerCompleteNotification(): void {
    new AppNotification('Timer finished', 'GET TO WORK!').showNotification();
  }

  private exerciseCompleteNotification(
    event: Electron.IpcMain,
    exerciseName: string
  ): void {
    new AppNotification(
      `${exerciseName} completed!`,
      'Nice job!'
    ).showNotification();
  }

  private allExercisesCompleteNotification(): void {
    new AppNotification(
      'All exercises complete',
      'See you back tomorrow!'
    ).showNotification();
  }
}

new MainApp();
