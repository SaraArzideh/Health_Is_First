import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { setUserDietGoal } from '../actions/authActions';
import * as d3 from 'd3';
import { Link } from 'react-router-dom';

function NutritionTracker() {

  // State for form inputs
  const [gender, setGender] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [exceptionalSituation, setExceptionalSituation] = useState(false);
  const [todaysCalories, setTodaysCalories] = useState(0);
  const [dietGoal, setDietGoal] = useState(null);
  
  // from Redux store
  const age = useSelector(state => state.auth.user?.age);
  const dispatch= useDispatch();

    // Conditional rendering & calculating
    const calculateDietGoal = () => {
      if (exceptionalSituation) {
        alert("The Health is First, could not recommend nutrition in exceptional situations. It would be better to consult with a professional!");
        return;
      }
      let calculatedDietGoal = 0;
      
  // Female user diet goal calculation
  if (gender === 'female') {
    switch (activityLevel) {
      case 'low-activity':
        if (age >= 14 && age <= 18) calculatedDietGoal = 1800;
        else if (age >= 19 && age <= 30) calculatedDietGoal = 1900; // Average between 1800 and 2000
        else if (age >= 31 && age <= 50) calculatedDietGoal = 1800;
        else if (age > 51) calculatedDietGoal = 1600;
        break;
      case 'moderate-activity':
        if (age >= 14 && age <= 18) calculatedDietGoal = 2000;
        else if (age >= 19 && age <= 30) calculatedDietGoal = 2100; // Average between 2000 and 2200
        else if (age >= 31 && age <= 50) calculatedDietGoal = 2000;
        else if (age > 51) calculatedDietGoal = 1800;
        break;
      case 'active':
        if (age >= 14 && age <= 18) calculatedDietGoal = 2400;
        else if (age >= 19 && age <= 30) calculatedDietGoal = 2400;
        else if (age >= 31 && age <= 50) calculatedDietGoal = 2200;
        else if (age > 51) calculatedDietGoal = 2200;
        break;
      default:
        alert("You didn't define your life style!");
        break;
    }
  }

  // Male user diet goal calculation
  if (gender === 'male') {
    switch (activityLevel) {
      case 'low-activity':
        if (age >= 14 && age <= 18) calculatedDietGoal = 2200; // Average between 2000 and 2400
        else if (age >= 19 && age <= 30) calculatedDietGoal = 2500; // Average between 2400 and 2600
        else if (age >= 31 && age <= 50) calculatedDietGoal = 2300; // Average between 2200 and 2400
        else if (age > 51) calculatedDietGoal = 2100; // Average between 2000 and 2200
        break;
      case 'moderate-activity':
        if (age >= 14 && age <= 18) calculatedDietGoal = 2600; // Average between 2400 and 2800
        else if (age >= 19 && age <= 30) calculatedDietGoal = 2700; // Average between 2600 and 2800
        else if (age >= 31 && age <= 50) calculatedDietGoal = 2500; // Average between 2400 and 2600
        else if (age > 51) calculatedDietGoal = 2300; // Average between 2200 and 2400
        break;
      case 'active':
        if (age >= 14 && age <= 18) calculatedDietGoal = 3000; // Average between 2800 and 3200
        else if (age >= 19 && age <= 30) calculatedDietGoal = 3000;
        else if (age >= 31 && age <= 50) calculatedDietGoal = 2900; // Average between 2800 and 3000
        else if (age > 51) calculatedDietGoal = 2600; // Average between 2400 and 2800
        break;
      default:
        alert("You didn't define your life style!");
        break;
    }
  }

  // update the state
  setDietGoal(calculatedDietGoal);
};







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
