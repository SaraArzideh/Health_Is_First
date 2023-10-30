import React from 'react';
import { createContext, useState, useContext } from 'react';

const DashboardContext = createContext();

export const useDashboard = () => {
  return useContext(DashboardContext);
};

export const DashboardProvider = ({ children }) => {
  const [isDashboardOpen, setDashboardOpen] = useState(false);

  const toggleDashboard = () => {
    setDashboardOpen(!isDashboardOpen);
  };

  return (
    <DashboardContext.Provider value={{ isDashboardOpen, toggleDashboard }}>
      {children}
    </DashboardContext.Provider>
  );
};
