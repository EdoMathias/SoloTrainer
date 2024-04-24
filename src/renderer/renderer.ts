import './index.css';
import { ipcRenderer } from 'electron';
const electronApi = (window as any).electronApi;

console.log(
  '👋 This message is being logged by "renderer.js", included via webpack'
);

// const input = document.getElementById('message-input') as HTMLInputElement;
// const button = document.getElementById('send-button') as HTMLButtonElement;

// button.addEventListener('click', () => {
//   console.log('Sending message to main process');
//   electronApi.setText(input.value);
// });
