import ExerciseForm from "./ExerciseForm";
import MenuButton from "../../MenuButton/MenuButton";
import TimerForm from "../../Timer/TimerForm";
import "./Settings.css";

function Settings() {
  return (
    <div className="settings-container">
      <h1 className="settings-title">Settings</h1>
      <MenuButton navTo="mainMenu" name="Main Menu" />
      <hr />
      <TimerForm />
      <hr />
      <ExerciseForm />
    </div>
  );
}

export default Settings;
