import { NavLink } from 'react-router-dom';
import './MenuButton.css';

interface MenuButtonProps {
  name: string;
  navTo: string;
}

function MenuButton(menuButtonProps: MenuButtonProps): React.ReactElement {
  function handleClick() {
    console.log(`${menuButtonProps.name} button clicked`);
  }

  return (
    <NavLink
      to={`/${menuButtonProps.navTo}`}
      className="menuButton"
      onClick={() => handleClick()}
    >
      {menuButtonProps.name}
    </NavLink>
  );
}

export default MenuButton;
