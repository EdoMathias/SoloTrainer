import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import DailyQuest from "../Areas/DailyQuest/DailyQuest";
import MainMenu from "../Areas/MainMenu/MainMenu";
import Settings from "../Areas/Settings/Settings";

function Routing(): React.ReactElement {
  return (
    <>
      <Routes>
        {/* Main Menu: */}
        <Route path="/mainMenu/*" element={<MainMenu />} />

        {/* Trainer: */}
        <Route path="/dailyQuest" element={<DailyQuest />} />

        {/* Settings: */}
        <Route path="/settings" element={<Settings />} />

        {/* Default Route: */}
        <Route path="/" element={<Navigate to="/mainMenu" />} />
      </Routes>
    </>
  );
}

export default Routing;
