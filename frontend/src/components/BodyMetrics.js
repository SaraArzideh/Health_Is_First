import React from 'react';
import * as d3 from 'd3';

function BodyMetrics() {
  return (
    <div className="weight-page">
      <h1>Body Metrics Tracking</h1>
      <p>Log Today's Intake, Plan Tomorrow's Progress!</p>

      <nav>
        <a href="/dashboard">Dashboard</a>
        <a href="/activity">Activity</a>
        <a href="/weight">Weight</a>
        <a href="/diet">Diet</a>
        <a href="/login">Signup/Login</a>
      </nav>
      <input placeholder="Weight" />
      <input placeholder="Height" />
      {/* Visualization component for weight changes comes here */}
      <button><a href="/">Back to Home Page</a></button>
    </div>
  );
}

export default BodyMetrics;
