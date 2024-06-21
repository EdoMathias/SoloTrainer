import MenuButton from "../../MenuButton/MenuButton";
import "./MainMenu.css";

function MainMenu(): React.ReactElement {
  return (
    <div className="main-menu-container">
      <h1 className="main-menu-title">SoloTrainer</h1>
      <hr />
      <p className="main-menu-p">YOUR APP FOR STAYING IN SHAPE DAILY</p>
      <hr />
      <p className="main-menu-p">CONFIGURE YOUR TRAINER IN THE SETTINGS</p>
      <p className="main-menu-p">
        AND GO TO DAILY QUEST TO ACCESS YOUR TRAINER
      </p>
      <hr />
      <MenuButton name="DAILY QUEST" navTo="dailyQuest" />
      <MenuButton name="SETTINGS" navTo="settings" />
    </div>
  );
}

export default MainMenu;
