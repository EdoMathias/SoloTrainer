// This is the main process file. It will manage application lifecycle events
//  and IPC communication.
import { app, ipcMain } from "electron";
import Store from "electron-store";
import ExerciseModel from "../models/exercise-model";
import GetTimerModel from "../models/getTimer-model";
import TimerModel from "../models/timer-model";
import AppNotification from "./notification";
import WindowManager from "./window";

class MainApp {
  private windowManager: WindowManager;
  private store: Store;
  constructor() {
    this.windowManager = new WindowManager();
    this.store = new Store();
    app.on("ready", this.windowManager.createWindow);
    app.on("browser-window-created", this.handleDateOnAppOpen.bind(this));
    app.on("window-all-closed", this.handleWindowAllClosed);
    app.on("activate", this.handleActivate);
    ipcMain.handle("set-exercises", this.setExercises.bind(this));
    ipcMain.handle("get-exercises", this.getExercises.bind(this));
    ipcMain.on(
      "increment-repetitions",
      this.incrementExerciseRepetitions.bind(this)
    );
    ipcMain.on(
      "decrement-repetitions",
      this.decrementExerciseRepetitions.bind(this)
    );
    ipcMain.on("exercise-complete", this.setExerciseComplete.bind(this));
    ipcMain.on("all-exercises-complete", this.allExercisesCompleteNotification);
    ipcMain.on("set-timer", this.setTimer.bind(this));
    ipcMain.handle("get-timer", this.getTimer.bind(this));
    ipcMain.on("timer-complete", this.timerCompleteNotification);
  }

  //----------------------------------------------------------------------------
  private handleWindowAllClosed(): void {
    if (process.platform !== "darwin") {
      app.quit();
    }
  }

  //----------------------------------------------------------------------------
  private handleActivate(): void {
    if (this.windowManager.getMainWindow() === null) {
      this.windowManager.createWindow();
    }
  }

  //----------------------------------------------------------------------------
  private setExercises(
    event: Electron.IpcMainInvokeEvent | null = null,
    exercises: ExerciseModel[]
  ): void {
    this.store.set("exercises", exercises);
  }

  //----------------------------------------------------------------------------
  private getExercises(
    event: Electron.IpcMainInvokeEvent | null = null
  ): ExerciseModel[] {
    const exercises = this.store.get("exercises") as ExerciseModel[];

    if (!exercises) {
      return [];
    }

    return exercises;
  }

  //----------------------------------------------------------------------------
  private setExerciseComplete(
    event: Electron.IpcMainEvent,
    exerciseName: string
  ): void {
    let exercises = this.getExercises();
    let exerciseFound = false;

    exercises = exercises.map((exercise) => {
      if (exercise.name === exerciseName) {
        exerciseFound = true;
        return { ...exercise, completed: true, notificationSent: true };
      }
      return exercise;
    });

    if (exerciseFound) {
      this.store.set("exercises", exercises);
      this.exerciseCompleteNotification(null, exerciseName);
    }

    let allCompleted = this.checkIfAllCompleted(exercises);
    if (allCompleted) {
      this.handleAllExercisesCompleted();
    }
  }

  //----------------------------------------------------------------------------
  private incrementExerciseRepetitions(
    event: Electron.IpcMainEvent,
    exerciseName: string
  ) {
    let exercises = this.getExercises();
    let exerciseFound = false;

    exercises = exercises.map((exercise) => {
      if (exercise.name === exerciseName) {
        exerciseFound = true;
        return {
          ...exercise,
          currentRepetitions: exercise.currentRepetitions + 1,
        };
      }
      return exercise;
    });

    if (exerciseFound) {
      this.setExercises(null, exercises);
      return;
    }
  }

  //----------------------------------------------------------------------------
  private decrementExerciseRepetitions(
    event: Electron.IpcMainEvent,
    exerciseName: string
  ) {
    let exercises = this.getExercises();
    let exerciseFound = false;

    exercises = exercises.map((exercise) => {
      if (exercise.name === exerciseName) {
        exerciseFound = true;
        return {
          ...exercise,
          currentRepetitions: exercise.currentRepetitions - 1,
        };
      }
      return exercise;
    });

    if (exerciseFound) {
      this.setExercises(null, exercises);
      return;
    }
  }

  //----------------------------------------------------------------------------
  private checkIfAllCompleted(exercises: ExerciseModel[]): boolean {
    let allCompleted = exercises.every(
      (exercise) => exercise.completed === true
    );

    return allCompleted;
  }

  //----------------------------------------------------------------------------
  private handleAllExercisesCompleted() {
    // Send notification about all exercises being completed
    this.allExercisesCompleteNotification();
  }

  //----------------------------------------------------------------------------
  private setDate(event: Electron.IpcMainEvent | null = null): void {
    let date = new Date().getDate();
    this.store.set("date", date);
  }

  //----------------------------------------------------------------------------
  private getDate(event: Electron.IpcMainEvent | null = null): number {
    const date = this.store.get("date") as number;
    return date;
  }

  //----------------------------------------------------------------------------
  private resetRepetitionsForNewDate(
    event: Electron.IpcMainEvent | null = null
  ) {
    const dayFromConfig = this.getDate(null);
    const today = new Date().getDate();

    // To simulate a new day
    // const today = new Date().getDate() + 1;

    let exercises = this.getExercises();

    if (today != dayFromConfig) {
      exercises.forEach((exercise) => {
        exercise.completed = false;
        exercise.notificationSent = false;
        exercise.currentRepetitions = 0;
      });
    }
    this.setExercises(null, exercises);
  }

  //----------------------------------------------------------------------------
  private handleDateOnAppOpen(event: Electron.IpcMainEvent | null = null) {
    this.setDate();
    this.resetRepetitionsForNewDate();
  }

  //----------------------------------------------------------------------------
  private setTimer(event: Electron.IpcMainEvent, timer: TimerModel): void {
    this.store.set("timer", timer);
  }

  //----------------------------------------------------------------------------
  private getTimer(event: Electron.IpcMainEvent) {
    const timer = this.store.get("timer") as GetTimerModel;

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

  //----------------------------------------------------------------------------
  private timerCompleteNotification(): void {
    new AppNotification("Timer finished", "GET TO WORK!").showNotification();
  }

  //----------------------------------------------------------------------------
  private exerciseCompleteNotification(
    event: Electron.IpcMainEvent | null = null,
    exerciseName: string
  ): void {
    new AppNotification(
      `${exerciseName} completed!`,
      "Nice job!"
    ).showNotification();
  }

  //----------------------------------------------------------------------------
  private allExercisesCompleteNotification(): void {
    new AppNotification(
      "All exercises complete",
      "See you back tomorrow!"
    ).showNotification();
  }
}

new MainApp();
