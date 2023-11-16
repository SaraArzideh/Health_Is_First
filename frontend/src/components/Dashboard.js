import React from 'react';
import { useContext } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { useDispatch, useSelector } from 'react-redux';
// mport { setUserActivityGoal } from '../actions/authActions';
import {optimalDiet} from '../components/NutritionTracker'
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
  const optimalDiet = useSelector (state=> state.auth.user?.optimalDiet||0);
 
  
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
        
          <h2>Your Activity Progress</h2>
          <p>Your Current Daily Activity Goal is {activityGoal} minutes per day.</p>

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
          <h2>Your Diet Progress</h2>
          <p>Your Current Diet limit is to Consume {optimalDiet} Calories per day.</p>


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
          <h2>Your Body Metrics</h2>
          <p>Your Current Body Mass Index is {BMI}.</p>


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
