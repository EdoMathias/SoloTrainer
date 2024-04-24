import MenuButton from '../../MenuButton/MenuButton';
// import './MainMenu.css';

function MainMenu(): React.ReactElement {
  return (
    <div className="main-menu-container">
      <MenuButton name="DailyQuest" navTo="dailyQuest" />
      <MenuButton name="Settings" navTo="settings" />
    </div>
  );
}

export default MainMenu;
