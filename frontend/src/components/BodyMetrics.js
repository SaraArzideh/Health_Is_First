import React from 'react';
import { useState } from 'react';
import{useSelector, useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {setUserCurrentWeight} from '../actions/authActions'
import WeightHistoryGraph from './WeightHistoryGraph';
import * as d3 from 'd3';
import { Link } from 'react-router-dom';

function BodyMetrics() {
  const dispatch = useDispatch();
  // Pull user data from Redux store
  const userData=useSelector(state=> state.auth.user)
  const [showGraph, setShowGraph]=useState(false);

  const [newCurrentWeight, setNewCurrentWeight] = useState(userData.currentWeight);
  const [isEditingWeight, setIsEditingWeight]= useState(false);

  // Calculate the BMI and round it to one decimal place!
  const BMI = (newCurrentWeight / ((userData.height / 100) ** 2)).toFixed(1);


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
    setNewCurrentWeight(e.target.value);
  };
  
  const handleWeightSubmit=async()=>{
    if (isEditingWeight){
      try {
        const response = await fetch('http://localhost:5000/weight', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
          body: JSON.stringify({ currentWeight: newCurrentWeight, userId: userData.id })
        });
        const data = await response.json();

        if (response.ok) {
          dispatch(setUserCurrentWeight(newCurrentWeight));
          //Show the BMI category toast message
          toast (`Your new BMI is ${BMI}. ${BMICategory}`,{
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
          });
          setIsEditingWeight(false);   //Exit editing mode
        }else{
          toast.error(`Error: ${data.message}`);
        }
      } catch (error) {
        console.error('Failed to update weight', error);
        toast.error('Failed to update weight');
      }
    }
  };
  const toggleWeightHistory = () => {
    setShowGraph(!showGraph);
  };

  return (
    <div className="weight-page">
        <h1>Body Metrics Tracking</h1>
        <h2>Log Today's Intake and Plan for Tomorrow!</h2>
        <div className="animated-message editable-message">
            {isEditingWeight ? (
              <>
                <input 
                  type="number"
                  value={newCurrentWeight}
                  onChange={handleWeightChange}
                  placeholder="Current Weight (in Kg)"
                />
                <button onClick={handleWeightSubmit}>Submit</button>
              </>
            ) : (
              <>        
                <p>Your Current Weight is {newCurrentWeight} Kg.
                <button onClick={handleEditWeightToggle}>Edit</button></p>
                <p>Your Current Body Mass Index is {BMI}.</p>
                <p>Normal Weight Range for you is {((((userData.height)/100)**2)*18.5).toFixed(1)} - {((((userData.height)/100)**2)*25).toFixed(1)} Kg!</p>
              </>
            )}
          </div>
        <button onClick={toggleWeightHistory}>View Your Body Metric Progress!</button>
        {showGraph && <WeightHistoryGraph />}

        <button className="btn"><Link to="/">Back to Home Page</Link></button>
    </div>
  );
}

export default BodyMetrics;
