import logo from'./components/shared/logo.png';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//context provider
import { DashboardProvider } from './context/DashboardContext';

// Components
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import ActivityTracker from './components/ActivityTracker';
import BodyMetrics from './components/BodyMetrics';
import NutritionTracker from './components/NutritionTracker';
import LoginPage from './components/LoginPage';
// CSS
import './App.css';

function App() {
  return (
    <DashboardProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" exact element={<HomePage/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/activity" element={<ActivityTracker/>} />
            <Route path="/weight" element={<BodyMetrics/>} />
            <Route path="/diet" element={<NutritionTracker/>} />
            <Route path="/login" component={<LoginPage/>} />
          </Routes>
          <Footer/>
        </div>
      </Router>
    </DashboardProvider>
    
  );
}

export default App;