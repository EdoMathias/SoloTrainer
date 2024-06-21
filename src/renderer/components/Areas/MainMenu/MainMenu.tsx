import MenuButton from "../../MenuButton/MenuButton";
import "./MainMenu.css";

function MainMenu(): React.ReactElement {
  return (
    <div className="main-menu-container">
      <h1 className="main-menu-title">SoloTrainer</h1>
      <MenuButton name="DailyQuest" navTo="dailyQuest" />
      <MenuButton name="Settings" navTo="settings" />
    </div>
  );
}

export default MainMenu;
