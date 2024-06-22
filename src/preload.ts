// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
import ExerciseModel from "./models/exercise-model";
import TimerModel from "./models/timer-model";

contextBridge.exposeInMainWorld("trainerApi", {
  setExercises: (exercises: ExerciseModel[]) => {
    return ipcRenderer.invoke("set-exercises", exercises);
  },
  getExercises: () => {
    return ipcRenderer.invoke("get-exercises");
  },
  incrementRepetitions: (exerciseName: string) => {
    ipcRenderer.send("increment-repetitions", exerciseName);
  },
  decrementRepetitions: (exerciseName: string) => {
    ipcRenderer.send("decrement-repetitions", exerciseName);
  },
  exerciseComplete: (exerciseName: string) => {
    ipcRenderer.send("exercise-complete", exerciseName);
  },
  allExercisesComplete: () => {
    ipcRenderer.send("all-exercises-complete");
  },
});

contextBridge.exposeInMainWorld("timerApi", {
  setTimer: (timer: TimerModel) => {
    ipcRenderer.send("set-timer", timer);
  },
  getTimer: () => {
    return ipcRenderer.invoke("get-timer");
  },
  timerComplete: () => {
    ipcRenderer.send("timer-complete");
  },
});
