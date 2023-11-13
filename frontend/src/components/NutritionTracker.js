import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { setUserTodayDiet } from '../actions/authActions';
import * as d3 from 'd3';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function NutritionTracker() {
  const dispatch = useDispatch();
  const user = useSelector(state=> state.auth.user || {});

  // States for managing inputs and messages
  const [todayDiet, setTodayDiet] = useState('');
  const [optimalDiet, setOptimalDiet] = useState(null);

  // Calculate the optimal diet on component mount or when user data changes
  useEffect(() => {
    if (user && user.id) {
      calculateOptimalDiet();
    }
  }, [user]);

  // Conditional rendering & calculating
  const calculateOptimalDiet = () => {
      if (user.exceptionalSituation) {
        setOptimalDiet("The Health is First, do not recommend diet in exceptional situations. Please consult a professional!");
        return;
      }
  const calculatedOptimalDiet =0;
  // Female user diet goal calculation
  if (user.gender === 'female') {
    switch (user.activityLevel) {
      case 'low-activity':
        if (user.age >= 14 && user.age <= 18) calculatedOptimalDiet = 1800;
        else if (user.age >= 19 && user.age <= 30) calculatedOptimalDiet = 1900; // Averuser.age between 1800 and 2000
        else if (user.age >= 31 && user.age <= 50) calculatedOptimalDiet = 1800;
        else if (user.age > 51) calculatedOptimalDiet = 1600;
        break;
      case 'moderate-activity':
        if (user.age >= 14 && user.age <= 18) calculatedOptimalDiet = 2000;
        else if (user.age >= 19 && user.age <= 30) calculatedOptimalDiet = 2100; // Average between 2000 and 2200
        else if (user.age >= 31 && user.age <= 50) calculatedOptimalDiet = 2000;
        else if (user.age > 51) calculatedOptimalDiet = 1800;
        break;
      case 'active':
        if (user.age >= 14 && user.age <= 18) calculatedOptimalDiet = 2400;
        else if (user.age >= 19 && user.age <= 30) calculatedOptimalDiet = 2400;
        else if (user.age >= 31 && user.age <= 50) calculatedOptimalDiet = 2200;
        else if (user.age > 51) calculatedOptimalDiet = 2200;
        break;
      default:
        alert("You didn't define your life style!");
        break;
    }
  }

  // Male user diet goal calculation
  if (user.gender === 'male'|| 'nonbinary') {
    switch (user.activityLevel) {
      case 'low-activity':
        if (user.age >= 14 && user.age <= 18) calculatedOptimalDiet = 2200; // Average between 2000 and 2400
        else if (user.age >= 19 && user.age <= 30) calculatedOptimalDiet = 2500; // Average between 2400 and 2600
        else if (user.age >= 31 && user.age <= 50) calculatedOptimalDiet = 2300; // Average between 2200 and 2400
        else if (user.age > 51) calculatedOptimalDiet = 2100; // Average between 2000 and 2200
        break;
      case 'moderate-activity':
        if (user.age >= 14 && user.age <= 18) calculatedOptimalDiet = 2600; // Average between 2400 and 2800
        else if (user.age >= 19 && user.age <= 30) calculatedOptimalDiet = 2700; // Average between 2600 and 2800
        else if (user.age >= 31 && user.age <= 50) calculatedOptimalDiet = 2500; // Average between 2400 and 2600
        else if (user.age > 51) calculatedOptimalDiet = 2300; // Average between 2200 and 2400
        break;
      case 'active':
        if (user.age >= 14 && user.age <= 18) calculatedOptimalDiet = 3000; // Average between 2800 and 3200
        else if (user.age >= 19 && user.age <= 30) calculatedOptimalDiet = 3000;
        else if (user.age >= 31 && user.age <= 50) calculatedOptimalDiet = 2900; // Average between 2800 and 3000
        else if (user.age > 51) calculatedOptimalDiet = 2600; // Average between 2400 and 2800
        break;
      default:
        alert("You didn't define your life style!");
        break;
    }
  }

  // update the state
  setOptimalDiet(calculatedOptimalDiet);
  dispatch(setUserTodayDiet(calculatedOptimalDiet));
};

  // Function to handle the submission of today's consumed calories
  const handleTodayDietSubmit = () => {
    const difference = optimalDiet - todayDiet;
    if (difference > 0) {
      toast.info('Today you eat less than your diet');
    } else if (difference === 0) {
      toast.success('Today you reached your diet target, Keep continue in next days!');
    } else {
      toast.warning('Today you eat more than your diet!');
    }
    dispatch(setUserTodayDiet(todayDiet));
  };

  return (
    <div className="diet-page">
      <h1>What You Eat Matters, Let's Track It!</h1>

      {user?.exceptionalSituation && (
        <p>The Health is First, do not recommend diet in exceptional situations. Please consult a professional!</p>
      )}

      {!user?.exceptionalSituation && (
        <p>According to the data you provided, You should consume {optimalDiet} calories each day.</p>
      )}

      {/* input holder to enter today's diet */}
      <div className="form-group">
        <label htmlFor="todayDiet">Today's Consuming Calories:</label>
        <input
          type="number"
          id="todayDiet"
          value={todayDiet}
          onChange={e => setTodayDiet(e.target.value)}
          placeholder="Enter today's consumed calories"
        />
        <button onClick={handleTodayDietSubmit}>Submit</button>
      </div>

      {/* Placeholder for the graph */}
      <div id="calories-history-graph">
        {/* D3 graph would come here */}
      </div>
      <button className="btn"><Link to="/">Back to Home Page</Link></button>
    </div>
  );
};

export default NutritionTracker;
