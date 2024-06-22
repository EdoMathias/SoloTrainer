import ExerciseForm from "../../Exercises/ExerciseForm";
import MenuButton from "../../MenuButton/MenuButton";
import TimerForm from "../../Timer/TimerForm";
import "./Settings.css";

function Settings() {
  return (
    <div className="settings-container">
      <h1 className="settings-title">SETTINGS</h1>
      <div className="navigation-buttons-container">
        <MenuButton navTo="dailyQuest" name="DAILY QUEST" />
        <MenuButton navTo="mainMenu" name="MAIN MENU" />
      </div>
      <hr />
      <TimerForm />
      <hr />
      <ExerciseForm />
    </div>
  );
}

export default Settings;
