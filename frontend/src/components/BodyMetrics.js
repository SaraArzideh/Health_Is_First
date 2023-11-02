import React from 'react';
import * as d3 from 'd3';

function BodyMetrics() {
  return (
    <div className="weight-page">
      <h1>Body Metrics Tracking</h1>
      <h2>Log Today's Intake and Plan for Tomorrow!</h2>


      <input placeholder="Weight (in Kg)" />
      <input placeholder="Height (in meter)" />
      {/* Visualization component for weight changes comes here */}
      <button><a href="/">Back to Home Page</a></button>
    </div>
  );
}

export default BodyMetrics;
