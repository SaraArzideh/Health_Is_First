import React from 'react';
import { useContext } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../services/api';
import { setUserProfile, setUserOptimalDiet, setUsertotalTodayDiet } from '../actions/authActions';
// mport { setUserActivityGoal } from '../actions/authActions';
import * as d3 from 'd3';

// Simulated User Context to get user's progress data
const UserContext= React.createContext();

function Dashboard() {

    // To solve the non logged-in viewer, making an empty default object
    const defaultUser = {
      currentWeight: 0,
    };

  //pull user data from redux state
  const userData= useSelector(state=> state.auth.user)|| defaultUser;
  const BMI = (userData.currentWeight / ((userData.height / 100) ** 2)).toFixed(1);
  const { isDashboardOpen, toggleDashboard } = useDashboard();

  const dispatch = useDispatch();

  // Get the goal from the user state inside authReducer
  const activityGoal = useSelector(state => state.auth.user?.activityGoal||0); 
  const optimalDiet = useSelector (state=> state.auth.optimalDiet||0);
 
  
/*
  // Function to handle goal setting from the dashboard
  const handleDashboardSetGoal = (goal) => {
      dispatch(setUserActivityGoal(goal));
  };
*/

    // Rendering
    return (
      <div className="dashboard-page">
        <h1>Your Fitness Progress Overview</h1>

        <div className="progress-sections">
        {/* Visualization for Activity Progress */}
        <section className="activity-progress">
        
          <h2>Step by Step Progress 🏃‍♂️</h2>
          <h3>Your Daily Activity Goal is {activityGoal} minutes.</h3>

          {/* Daily Activity Progress Visualization*/}
          <div className="daily activity">Daily:{/*D3.js, placeholder */}</div>
          {/* Weekly Activity Progress Visualization*/}
          <div className="weekly activity">Weekly:{/*D3.js, placeholder */}</div>
          {/* Monthly Activity Progress Visualization*/}
          <div className="monthly activity">Monthly:{/*D3.js, placeholder */}</div>
          {/* Yearly Activity Progress Visualization*/}
          <div className="yearly activity">Yearly:{/*D3.js, placeholder */}</div>     
        </section>

        {/* Visualization for Diet Progress */}
        <section className="diet-progress">
          <h2>Plate by Plate Tracking 🥗</h2>
          <h3>Your Daily Diet Limit is {optimalDiet} Calories.</h3>


          {/* Daily Diet Progress Visualization*/}
          <div className="daily diet">Daily:{/*D3.js, placeholder */}</div>
          {/* Weekly Diet Progress Visualization*/}
          <div className="weekly diet">Weekly:{/*D3.js, placeholder */}</div>
          {/* Monthly Diet Progress Visualization*/}
          <div className="monthly diet">Monthly:{/*D3.js, placeholder */}</div>
          {/* Yearly Diet Progress Visualization*/}
          <div className="yearly diet">Yearly:{/*D3.js, placeholder */}</div>     
        </section>

        {/* Visualization for Body Metrics Progress */}
        <section className="body-metrics-progress">
          <h2> Measure Your Success 📊</h2>
          <h3>Your Body Mass Index is {BMI}.</h3>


          {/* Daily Body Metrics Visualization*/}
          <div className="daily metrics">Daily:{/*D3.js, placeholder */}</div>
          {/* Weekly Body Metrics Visualization*/}
          <div className="weekly metrics">Weekly:{/*D3.js, placeholder */}</div>
          {/* Monthly Body Metrics Visualization*/}
          <div className="monthly metrics">Monthly:{/*D3.js, placeholder */}</div>
          {/* Yearly Body Metrics Visualization*/}
          <div className="yearly metrics">Yearly:{/*D3.js, placeholder */}</div>     
        </section>
        </div>
      </div>
    );
}

export default Dashboard;
