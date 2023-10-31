import React from 'react';
import * as d3 from 'd3';


function ActivityTracker() {
  return (
    <div className="activity-page">
      <h1>Stay Active and Track Your Activities!</h1>
      
      <input placeholder="Time length of workout" />
      {/* Visualization component for goal tracking comes here */}
      <button className="btn"><a href="/">Back to Home Page</a></button>
    </div>
  );
}

export default ActivityTracker;
