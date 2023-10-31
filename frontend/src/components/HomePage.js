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
    const [activityGoal, setActivityGoal] = useState('');
    const [dietGoal, setDietGoal] = useState('');
    const { isDashboardOpen, toggleDashboard } = useDashboard();

    //State to show or hide the dashboard
    const [showDashboard, setShowDashboard] = useState(false);

    //Fetching user data from context
    const user= useContext(UserContext);

    return (
      <div className="home-page">
        <h1>Your Fitness Journey Starts Here</h1>

        {user && (
          <section className="set-goals">
            <h2>Set Goals Section</h2>
            <input 
              type="number"
              placeholder="Activity Goal (minutes per day)"
              value={activityGoal}
              onChange={(e) => setActivityGoal(e.target.value)}
            />
            <input 
              type="number"
              placeholder="Diet Goal (consumed calories per day)"
              value={dietGoal}
              onChange={(e) => setDietGoal(e.target.value)}
            />
            <button onClick={() => {/* submit goals to backend */ }}>Submit Goals</button>
          </section>
        )}
        { isLoggedIn ?
            <button className='btn' onClick={toggleDashboard}>Open The Dashboard</button>:
            <button className='btn' onClick={()=>window.location.href="/signup" }>Start</button>
        }
    </div>  
  );
}

export default HomePage;