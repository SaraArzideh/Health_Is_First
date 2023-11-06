import React from 'react';
import { useState } from 'react';
import{useSelector, useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {setUserWeightGoal} from '../actions/authActions'
import * as d3 from 'd3';

function BodyMetrics() {
  const dispatch = useDispatch();
  // Pull user data from Redux store
  const userData=useSelector(state=> state.auth.user)
  const [currentWeight, setCurrentWeight] = useState(userData.currentWeight);
  const [isEditingWeight, setIsEditingWeight]= useState(false);

  // Calculate the BMI and round it to one decimal place!
  const BMI = (currentWeight / ((userData.height / 100) ** 2)).toFixed(1);

  // Determine the BMI category
  const getBMICategory=(bmi)=>{
    if (bmi < 18.5) return "You are in the underweight range!";
    if (bmi>= 18.5 && bmi<25) return "You are in the healthy weight";
    if (bmi>=25 && bmi<30) return "You are in the overweight range!";
    return "You are in the obese range";
  }
  const BMICategory = getBMICategory(BMI);


  const handleEditWeightToggle = () => {
    setIsEditingWeight(!isEditingWeight);
  };

  // Add Current Weight
  const handleWeightChange = (e) => {
    setCurrentWeight(e.target.value);
  };
  const handleWeightSubmit=()=>{
    if (isEditingWeight){
      dispatch(setUserWeightGoal(currentWeight));
      //Show the BMI category toast message
      toast (`Your new BMI is ${BMI}. ${BMICategory}`,{
        position: toast.POSITION.TOP_CENTER,
        autoClose: 8000,
      });
  };
  setIsEditingWeight(false);
};
  const toggleWeightHistory = () => {
      // Logic to toggle the visualization component or redirect to another page
  };

  return (
    <div className="weight-page">
      <h1>Body Metrics Tracking</h1>
      <h2>Log Today's Intake and Plan for Tomorrow!</h2>
        <div>
          {isEditingWeight ? (
            <>
              <input 
                type="number"
                value={currentWeight}
                onChange={handleWeightChange}
                placeholder="Current Weight (in Kg)"
              />
              <button onClick={handleWeightSubmit}>Submit</button>
            </>
          ) : (
            <>        
                <p>Your Current Weight is {currentWeight} Kg.</p>
                <button onClick={handleEditWeightToggle}>Edit</button>
                <p>Your Current Body Mass Index is {BMI}.</p>
                <p>Normal Weight Range for you is {((((userData.height)/100)**2)*18.5).toFixed(1)} - {((((userData.height)/100)**2)*25).toFixed(1)} Kg!</p>
            </>
          )}
        </div>
        <button onClick={toggleWeightHistory}>View Your Body Metric Progress!</button>

        {/* Visualization component for weight changes comes here */}
      <button><a href="/">Back to Home Page</a></button>
    </div>
  );
}

export default BodyMetrics;
