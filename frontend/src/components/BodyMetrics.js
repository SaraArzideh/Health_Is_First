import React from 'react';
import { useState } from 'react';
import{useSelector, useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setUserWeightGoal } from '../actions/authActions';
import * as d3 from 'd3';

function BodyMetrics() {

  const [weightGoal, setWeightGoal] = useState(null);
  const [currentWeight, setCurrentWeight] = useState(null);
  const dispatch = useDispatch();

  // Add Current Weight
  const handleAddWeight = () => {
    let difference = currentWeight - weightGoal;

    let message = "";
    if(difference < 0) {
        message = `Current weight added. You need to lose ${Math.abs(difference)} Kg to reach your first weight target!`;
    } else if(difference > 0) {
        message = `Current weight added. You need to gain ${Math.abs(difference)} Kg to reach your first weight target!`;
    } else {
        message = "Current weight added. It looks like you are on your first weight target!";
    }

    toast(message);  // Display the toast message
}

    const handleEditGoal = () => {
      setWeightGoal(null);  // Reset the weightGoal to show input field again
    }
    const handleSetGoal = () => {
      // to store the weightGoal in Redux:
      dispatch(setUserWeightGoal(weightGoal));
  };

  const toggleEditGoal = () => {
      setWeightGoal(null); // To show the input field again
  };

  const toggleWeightHistory = () => {
      // Logic to toggle the visualization component or redirect to another page
  };

  return (
    <div className="weight-page">
      <h1>Body Metrics Tracking</h1>
      <h2>Log Today's Intake and Plan for Tomorrow!</h2>
        <div>
          <h2>Set Target Weight for Your Selected Date</h2>
          
          {!weightGoal ? (  // Check if weightGoal is null or not set
            // If no weightGoal, display the input field and the SET button
            <div>
                <input 
                    type="number"
                    value={weightGoal}
                    onChange={(e) => setWeightGoal(e.target.value)}
                    placeholder="Target weight (in Kg)"
                />
                <button onClick={handleSetGoal}>SET</button>
              </div>
            ) : (
              // If there's a weightGoal, display the set goal and the EDIT button
              <>
                <p>Your Current Target Weight is {weightGoal} Kg.</p>
                <button onClick={toggleEditGoal}>Edit</button>
              </>
            )
          }
      </div>
      <div>
      <h2>Add Current Weight </h2>
          <input 
            type="number"
            value={currentWeight}
            onChange={(e)=> setCurrentWeight(e.target.value)}
            placeholder="Current Weight (in Kg)"
        />
        <button onClick={handleAddWeight}>Add</button>
            </div>


        <button onClick={toggleWeightHistory}>See the history of activities</button>

        {/* Visualization component for weight changes comes here */}
      <button><a href="/">Back to Home Page</a></button>
    </div>
  );
}

export default BodyMetrics;
