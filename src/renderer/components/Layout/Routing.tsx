import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import DailyQuest from "../Areas/DailyQuest/DailyQuest";
import Settings from "../Areas/Settings/Settings";
import MainMenu from "../Areas/MainMenu/MainMenu";

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
