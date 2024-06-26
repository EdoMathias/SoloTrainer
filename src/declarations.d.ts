import ExerciseModel from "./models/exercise-model";
import TimerModel from "./models/timer-model";

export interface ITrainerApi {
  setExercises: (exercises: ExerciseModel[]) => void;
  getExercises: () => Promise<ExerciseModel[]>;
  incrementRepetitions: (exerciseName: string) => void;
  decrementRepetitions: (exerciseName: string) => void;
  exerciseComplete: (exerciseName: string) => void;
  allExercisesComplete: () => void;
}

export interface ITimerApi {
  setTimer: (timer: TimerModel) => void;
  getTimer: () => Promise<TimerModel>;
  timerComplete: () => void;
}

export interface IIpcRenderer {
  on: (
    channel: string,
    listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void
  ) => void;
  removeAllListeners: (channel: string) => void;
}

declare global {
  interface Window {
    trainerApi: ITrainerApi;
    ipcRenderer: IIpcRenderer;
    timerApi: ITimerApi;
  }
}
