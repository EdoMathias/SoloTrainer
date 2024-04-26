import React from 'react';
import ExerciseForm from './ExerciseForm';
import Timer from './Timer';

function Settings() {
  return (
    <div>
      <h1>Settings</h1>
      <hr />
      <Timer />
      <hr />
      <label>Daily quests:</label>
      <ExerciseForm />
    </div>
  );
}

export default Settings;
