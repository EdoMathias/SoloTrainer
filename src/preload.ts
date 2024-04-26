// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';
import ExerciseModel from './models/exercise-model';

contextBridge.exposeInMainWorld('trainerApi', {
  setExercises: (exercises: ExerciseModel[]) => {
    ipcRenderer.send('set-exercises', exercises);
  },
  getExercises: () => {
    return ipcRenderer.invoke('get-exercises');
  },
});
