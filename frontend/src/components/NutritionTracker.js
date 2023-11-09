import React from 'react';
import {useSelector} from 'react-redux';
import * as d3 from 'd3';
import { Link } from 'react-router-dom';

function NutritionTracker() {
  const dietGoal= useSelector(state=>state.auth.user.dietGoal);
  return (
    <div className="diet-page">
      <h1>What You Eat Matters, Let's Track It!</h1>
      <p>Your Current Daily Diet Goal is to Consume {dietGoal} Calories per day.</p>

      <input placeholder="Calories" />
      {/* Visualization component for diet tracking comes here */}
      <button className="btn"><Link to="/">Back to Home Page</Link></button>
    </div>
  );
}

export default NutritionTracker;
