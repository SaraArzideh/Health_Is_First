import React from 'react';
import { useState, useContext, useEffect } from 'react';
import * as d3 from 'd3';

// Simulate user context to check for logged-in state.
const UserContext =React.createContext();
function HomePage() {
  //State for goals
  const [activityGoal, setActivityGoal] = useState('');
  const [dietGoal, setDietGoal] = useState('');

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
            placeholder="Activity Goal (in minutes)"
            value={activityGoal}
            onChange={(e) => setActivityGoal(e.target.value)}
          />
          <input 
            type="number"
            placeholder="Diet Goal (in calories)"
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
      {user && (
        <>
      <button onClick={()=> setShowDashboard(!showDashboard)}>
            {showDashboard ? 'Close Dashboard' : 'Open The Dashboard'}
      </button>
      {showDashboard && (
            <div className="dashboard">
              {/* Dashboard Components with user achievements */}
              <p>{/* Achievement related to activity and diet goals */}</p>
            </div>
          )}
        </>
      )}
    </div>  
  );
}

export default HomePage;