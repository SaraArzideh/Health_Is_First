import React from 'react';
import * as d3 from 'd3';

function NutritionTracker() {
  return (
    <div className="diet-page">
      <h1>What You Eat Matters, Let's Track It!</h1>

      <input placeholder="Calories" />
      {/* Visualization component for diet tracking comes here */}
      <button><a href="/">Back to Home Page</a></button>
    </div>
  );
}

export default NutritionTracker;
