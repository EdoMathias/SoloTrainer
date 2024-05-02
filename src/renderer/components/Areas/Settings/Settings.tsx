import React from "react";
import ExerciseForm from "./ExerciseForm";
import Timer from "./Timer";
import MenuButton from "../../MenuButton/MenuButton";

function Settings() {
  return (
    <div>
      <h1>Settings</h1>
      <MenuButton navTo="mainMenu" name="Main Menu" />
      <hr />
      <Timer />
      <hr />
      <label>Daily quests:</label>
      <ExerciseForm />
    </div>
  );
}

export default Settings;
