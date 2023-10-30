import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { useDashboard } from '../context/DashboardContext';
import Dashboard from './Dashboard';
import * as d3 from 'd3';

// Simulate user context to check for logged-in state.
const UserContext =React.createContext();
function HomePage() {
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

      <nav>
        {user ? (
          <>
            <a href="/logout">Logout</a>
            <a href="/dashboard">Dashboard</a>
          </>
        ) : (
          <>
            <a href="/signup">Signup</a>
            <a href="/login">Login</a>
          </>
        )}
        <a href="/activities">Physical Activities</a>
        <a href="/weight">Weight Page</a>
        <a href="/diet">Diet Page</a>
      </nav>

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
      <section className="achievements">
        <h2>Achievements Section</h2>
        {/* achievement visualization components here */}
      </section>
      {!isDashboardOpen && <button onClick={toggleDashboard}>Open The Dashboard</button>}
      {isDashboardOpen && <Dashboard />}
    </div>  
  );
}

export default HomePage;