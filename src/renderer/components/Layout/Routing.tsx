import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import WorkoutForm from '../Trainer/WorkoutForm';
import Settings from '../Settings/Settings';
import Layout from './Layout';

function Routing(): React.ReactElement {
  return (
    <div className="Routes">
      <Routes>
        {/* Main Menu: */}
        <Route path="/mainMenu/*" element={<Layout />} />

        {/* Trainer: */}
        <Route path="/workoutForm" element={<WorkoutForm />} />

        {/* Settings: */}
        <Route path="/settings" element={<Settings />} />

        {/* Default Route: */}
        <Route path="/" element={<Navigate to="/mainMenu" />} />
      </Routes>
    </div>
  );
}

export default Routing;
