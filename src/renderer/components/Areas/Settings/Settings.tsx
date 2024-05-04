import ExerciseForm from "./ExerciseForm";
import MenuButton from "../../MenuButton/MenuButton";
import TimerForm from "../../Timer/TimerForm";

function Settings() {
  return (
    <div>
      <h1>Settings</h1>
      <MenuButton navTo="mainMenu" name="Main Menu" />
      <hr />
      <TimerForm />
      <hr />
      <label>Daily quests:</label>
      <ExerciseForm />
    </div>
  );
}

export default Settings;
