import logo from'./components/shared/logo.png';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';

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
    <>
    <ToastContainer/>
      <DashboardProvider>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/signup" element={<LoginPage isSignUp={true} />} />
              <Route path="/login" element={<LoginPage isSignUp={false} />} />
              <Route path="/" exact element={<HomePage/>} />
              <Route path="/dashboard" element={<Dashboard/>} />
              <Route path="/activity" element={<ActivityTracker/>} />
              <Route path="/weight" element={<BodyMetrics/>} />
              <Route path="/diet" element={<NutritionTracker/>} />
            </Routes>
            <Footer/>
          </div>
        </BrowserRouter>
      </DashboardProvider>
    </>
  );
}

export default App;