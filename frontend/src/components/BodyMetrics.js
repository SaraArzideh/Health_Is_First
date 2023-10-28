import React from 'react';

function BodyMetrics() {
  return (
    <div className="weight-page">
      <h1>Body Metrics Overview</h1>
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
