import React from 'react';
import { useContext } from 'react';
import * as d3 from 'd3';

// Simulated User Context to get user's progress data
const userContext= React.createContext();

function Dashboard() {
  //Fetching user data from context
  const userProgress=useContext(UserContext)  
    return (
      <div className="dashboard-page">
        <h1>Progress Overview</h1>

        {/* Visualization for Activity Progress */}
        <div className="activity progress">
          <h2>Activity Progress</h2>

          {/* Daily Activity Progress Visualization*/}
          <div className="daily activity">Daily:{/*D3.js, placeholder */}</div>
          {/* Weekly Activity Progress Visualization*/}
          <div className="weekly activity">Weekly:{/*D3.js, placeholder */}</div>
          {/* Monthly Activity Progress Visualization*/}
          <div className="monthly activity">Monthly:{/*D3.js, placeholder */}</div>
          {/* Yearly Activity Progress Visualization*/}
          <div className="yearly activity">Yearly:{/*D3.js, placeholder */}</div>     
        </div>

        {/* Visualization for Diet Progress */}
        <div className="diet progress">
          <h2>Diet Progress</h2>

          {/* Daily Diet Progress Visualization*/}
          <div className="daily diet">Daily:{/*D3.js, placeholder */}</div>
          {/* Weekly Diet Progress Visualization*/}
          <div className="weekly diet">Weekly:{/*D3.js, placeholder */}</div>
          {/* Monthly Diet Progress Visualization*/}
          <div className="monthly diet">Monthly:{/*D3.js, placeholder */}</div>
          {/* Yearly Diet Progress Visualization*/}
          <div className="yearly diet">Yearly:{/*D3.js, placeholder */}</div>     
        </div>

        {/* Visualization for Body Metrics Progress */}
        <div className="body metrics">
          <h2>Body Metrics</h2>

          {/* Daily Body Metrics Visualization*/}
          <div className="daily metrics">Daily:{/*D3.js, placeholder */}</div>
          {/* Weekly Body Metrics Visualization*/}
          <div className="weekly metrics">Weekly:{/*D3.js, placeholder */}</div>
          {/* Monthly Body Metrics Visualization*/}
          <div className="monthly metrics">Monthly:{/*D3.js, placeholder */}</div>
          {/* Yearly Body Metrics Visualization*/}
          <div className="yearly metrics">Yearly:{/*D3.js, placeholder */}</div>     
        </div>

        <button><a href="/">Back to Home Page</a></button>
      </div>
    );
}

export default Dashboard;
