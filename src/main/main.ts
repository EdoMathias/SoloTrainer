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
  /* 
  Sets the exercises passed by the renderer
  in the config.json file for data management.
  */
  private setExercises(
    event: Electron.IpcMainInvokeEvent | null = null,
    exercises: ExerciseModel[]
  ): void {
    this.store.set("exercises", exercises);
  }

  //----------------------------------------------------------------------------
  /*
  Gets the exercises we've set from the config.json.
  */
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
  /* 
  Sets the given exercise as complete in the config.json so the app knows it is
  done for today.
  notificationSent is also marked as complete to prevent notifications from 
  firing when they shouldn't.
  Checks if all exercises are completed so we can fire the 
  all-completed notification
  */
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
  /* 
  Increments the currentRepetitions of a given exercise in the config.json
  so the app can know the progress when relaunching / navigating to-and-from
  different pages.
  */
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
  /* 
  Decrements the currentRepetitions of a given exercise in the config.json
  so the app can know the progress when relaunching / navigating to-and-from
  different pages.
  */
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
  /* 
  Checks if all exercises are marked as completed so we can send the 
  "finished all exercises" notification.
  */
  private checkIfAllCompleted(exercises: ExerciseModel[]): boolean {
    let allCompleted = exercises.every(
      (exercise) => exercise.completed === true
    );

    return allCompleted;
  }

  //----------------------------------------------------------------------------
  /*
  Checks if all exercises have been completed and sends the all-completed
  notification accordingly.
  */
  private handleAllExercisesCompleted() {
    // Send notification about all exercises being completed
    this.allExercisesCompleteNotification();
  }

  //----------------------------------------------------------------------------
  /*
  Sets the date in the config.json so it can be used to check if a day has passed.
  */
  private setDate(event: Electron.IpcMainEvent | null = null): void {
    let date = new Date().getDate();
    this.store.set("date", date);
  }

  //----------------------------------------------------------------------------
  /*
  Gets the saved date from the config.json so it can be used to check if a day
  has passed.
  */
  private getDate(event: Electron.IpcMainEvent | null = null): number {
    const date = this.store.get("date") as number;
    return date;
  }

  //----------------------------------------------------------------------------
  /*
  Resets the completed, notificationSent, and currentRepetitions states when
  detecting that the today is a different day than the one in the config.json.
  When the exercises have been reset, we set the new exercises and day.
  */
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
    this.setDate();
  }

  //----------------------------------------------------------------------------
  /*
  Sets an interval to check if a day has passed while the app is running.
  If a new day has been detected, call resetRepetitionsForNewDate();
  */
  private checkIfDayPassed(event: Electron.IpcMainEvent | null = null) {
    const timeToCheck = 60 * 60 * 1000; // Currently set to 1 hour

    setInterval(() => {
      // Get the date on each interval
      const dayFromConfig = this.getDate(null);
      const today = new Date().getDate();

      if (today != dayFromConfig) {
        this.resetRepetitionsForNewDate();
      }
    }, timeToCheck);
  }

  //----------------------------------------------------------------------------
  /*
  Sets the date and checks if a day has passed in order to reset the exercises
  progress for a new date.
  */
  private handleDateOnAppOpen(event: Electron.IpcMainEvent | null = null) {
    this.setDate();
    this.resetRepetitionsForNewDate();
    this.checkIfDayPassed();
  }

  //----------------------------------------------------------------------------
  /*
  Sets the timer in the config.json to be used by the renderer.
  */
  private setTimer(event: Electron.IpcMainEvent, timer: TimerModel): void {
    this.store.set("timer", timer);
  }

  //----------------------------------------------------------------------------
  /*
  Gets the timer from the config.json.
  */
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
  /*
  Sends an app notification for when the timer is up.
  */
  private timerCompleteNotification(): void {
    new AppNotification("Timer finished", "GET TO WORK!").showNotification();
  }

  //----------------------------------------------------------------------------
  /*
  Sends an app notification for completing an exercise.
  */
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
  /*
  Sends an app notification for completing all exercises.
  */
  private allExercisesCompleteNotification(): void {
    new AppNotification(
      "All exercises complete",
      "See you back tomorrow!"
    ).showNotification();
  }
}

new MainApp();
