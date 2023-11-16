import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { useDashboard } from '../context/DashboardContext';
import Dashboard from './Dashboard';
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as d3 from 'd3';
import {ActivityContext} from '../context/ActivityContext'

// Simulate user context to check for logged-in state.
const UserContext = React.createContext();
function HomePage() {
    // Function to redirect to the signup page
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    //State for goals
    //const [activityGoal, setActivityGoal] = useState('');
    //const [dietGoal, setDietGoal] = useState('');

    const { isDashboardOpen, toggleDashboard } = useDashboard();

    //State to show or hide the dashboard
    const [showDashboard, setShowDashboard] = useState(false);

    //Fetching user data from context
    const user= useContext(UserContext);
  
    // Determine the class for the container based on the login status
    const containerClass = isLoggedIn ? "home-page-logged-in" : "home-page";

    return (
     <div className={containerClass}>
      <div className="hero">
        {isLoggedIn ? (
          <>
            <h1>Welcome back to Health Is First</h1>
            <p>Here you can track your fitness journey</p>
            <button className='btn' onClick={toggleDashboard}>
                {isDashboardOpen ? 'Close The Dashboard' : 'Open The Dashboard'}
            </button>
          </>
        ) : (
          <>
            <h1>Health Is First</h1>
            <p>Your journey to a healthier life starts here</p>
            <button className='btn' onClick={()=>window.location.href="/signup" }>Get Started</button>
          </>
        )}
      </div>
      {isDashboardOpen && <Dashboard />}  
    </div>  
  );
}

export default HomePage;