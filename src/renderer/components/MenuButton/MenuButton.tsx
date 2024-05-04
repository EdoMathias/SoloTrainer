import { NavLink } from "react-router-dom";
import "./MenuButton.css";

interface MenuButtonProps {
  name: string;
  navTo: string;
}

function MenuButton(menuButtonProps: MenuButtonProps): React.ReactElement {
  return (
    <NavLink to={`/${menuButtonProps.navTo}`} className="menuButton">
      {menuButtonProps.name}
    </NavLink>
  );
}

export default MenuButton;
