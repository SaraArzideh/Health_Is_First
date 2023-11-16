import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { setUserTodayDiet, setUsertotalTodayDiet, setUserOptimalDiet } from '../actions/authActions';
import * as d3 from 'd3';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function NutritionTracker() {
  const dispatch = useDispatch();
  const user = useSelector(state=> state.auth.user || {});

  // States for managing inputs and messages
  const [todayDiet, setTodayDiet] = useState('');
  const [optimalDiet, setOptimalDiet] = useState(null);
  const [todayDietEntries, setTodayDietEntries] = useState([]);

  // Calculate the optimal diet on component mount or when user data changes
  useEffect(() => {
    calculateOptimalDiet();
  }, [user]);

  // Conditional rendering & calculating
  const calculateOptimalDiet = () => {
    let calculatedOptimalDiet =0;
    if (user.exceptionalSituation) {
      setOptimalDiet("The Health is First, do not recommend diet in exceptional situations. Please consult a professional!");
      return;
    }
    // Female user diet goal calculation
    if (user.gender === 'female') {
      switch (user.activityLevel) {
        case 'low-active':
          if (user.age >= 14 && user.age <= 18) calculatedOptimalDiet = 1800;
          else if (user.age >= 19 && user.age <= 30) calculatedOptimalDiet = 1900; // Averuser.age between 1800 and 2000
          else if (user.age >= 31 && user.age <= 50) calculatedOptimalDiet = 1800;
          else if (user.age > 51) calculatedOptimalDiet = 1600;
          break;
        case 'moderate-active':
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
    }else if (user.gender === 'male'|| user.gender === 'nonbinary') {
      switch (user.activityLevel) {
        case 'low-active':
          if (user.age >= 14 && user.age <= 18) calculatedOptimalDiet = 2200; // Average between 2000 and 2400
          else if (user.age >= 19 && user.age <= 30) calculatedOptimalDiet = 2500; // Average between 2400 and 2600
          else if (user.age >= 31 && user.age <= 50) calculatedOptimalDiet = 2300; // Average between 2200 and 2400
          else if (user.age > 51) calculatedOptimalDiet = 2100; // Average between 2000 and 2200
          break;
        case 'moderate-active':
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
    }else{
  }
    // update the state with calculated value
    setOptimalDiet(calculatedOptimalDiet);
    // dispatch an action to update the store with the new value
    dispatch(setUserOptimalDiet(calculatedOptimalDiet));
};

  // Function to handle the submission of today's consumed calories
  const handleTodayDietSubmit = () => {
    
      const newEntry = Number(todayDiet);
      const updatedEntries = [...todayDietEntries, newEntry];
      setTodayDietEntries(updatedEntries);
      
      const totalTodayDiet = updatedEntries.reduce((acc, entry) => acc + entry, 0);
      const difference = optimalDiet - totalTodayDiet;
  
      if (difference > 0) {
        toast.info(`Today you've eaten ${totalTodayDiet} calories, which is ${difference} less than your diet target.`);
      } else if (difference === 0) {
        toast.success(`You've reached your diet limit of ${optimalDiet} calories for today.`);
      } else {
        const over = Math.abs(difference);
        toast.warning(`You've exceeded your diet target by ${over} calories.`);
      }

      // Update the entries and reset the input field
      setTodayDiet('');
  };

  //function to calculate the sum of today's diet(entries)
  const sumOfTodayDiet = () => {
    return todayDietEntries.reduce((acc, entry) => acc + entry, 0);
  };

  return (
    <div className="diet-page">
      <h1>What You Eat Matters, Let's Track It!</h1>
      <div className="animated-message editable-message">
        {user?.exceptionalSituation && (
            <p>The Health is First, do not recommend diet in exceptional situations. Please consult a professional!</p>
        )}

        {!user?.exceptionalSituation && (
          <p>Daily limit is {optimalDiet} calories. You can do it! </p>
        )}

        {/* input holder to enter today's diet */}
        <div className="form-group">
          <input
            type="number"
            id="todayDiet"
            value={todayDiet}
            onChange={e => setTodayDiet(Number(e.target.value))}
            placeholder="Enter today's consumed calories"
          />
          <button onClick={handleTodayDietSubmit}>Submit</button>
        </div>
        <div className="form-group">
          <p>Recorded today's intake: {sumOfTodayDiet()} calories!</p>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Entry</th>
            <th>Calories</th>
          </tr>
        </thead>
        <tbody>
          {todayDietEntries.map((entry, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{entry} calories</td>
            </tr>
          ))}
        </tbody>
      </table>


      {/* Placeholder for the graph */}
      <div id="calories-history-graph">
        {/* D3 graph would come here */}
      </div>
      <button className="btn"><Link to="/">Back to Home Page</Link></button>
    </div>
  );
};

export default NutritionTracker;
