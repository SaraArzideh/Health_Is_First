import React from 'react';
import { useState } from 'react';
import{useSelector, useDispatch} from 'react-redux';
import { ADD_ACTIVITY, SET_USER_ACTIVITY_GOAL } from '../actions/activityActions';
import { setUserActivityGoal } from '../actions/authActions';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as d3 from 'd3';
import { Link } from 'react-router-dom';


function ActivityTracker() {
  const dispatch = useDispatch();
  const activities = useSelector(state => state.activities.activities);

  // Create a state to determine if the goal is currently being edited:
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  
  const userActivityGoal = useSelector(state => state.auth.user?.activityGoal || 0);

  const [showActivityHistory, setShowActivityHistory] = useState(false);

  // Add a local state to determine if the goal has been set at least once:
  const [goalSetOnce, setGoalSetOnce] = useState(false);  

  // Fetch the activities and activity goal from the Redux state
  const [activityType, setActivityType] = useState('');
  const [activityDuration, setActivityDuration] = useState('');
  const [activityGoal, setActivityGoal] = useState(userActivityGoal);

  // Filter out the activities for the current day:
  const todaysActivities = activities.filter(activity => 
    new Date (activity.date).toDateString() === new Date().toDateString()
  );

  // Compare the total duration for today's activities:
  const todaysTotalDuration = todaysActivities.reduce((acc, activity) => acc + Number(activity.duration), 0);

  //Add a New Activity
  const handleAddActivity = () => {
    const newActivity = {
      id: Date.now(), // Using current timestamp as a unique id
      type: activityType,
      duration: Number(activityDuration), // Convert string to number
      date: new Date()
    };
    dispatch({type: ADD_ACTIVITY, payload:newActivity}); //asynchronous operation
    
    // Calculate the new total duration including the new activity
    const newTotalDuration=todaysTotalDuration+Number(activityDuration)
    
    const difference = activityGoal - newTotalDuration;
    let message;
    if (difference > 0){
      message = "Activity added! Keep moving! Just "+difference+" minutes to reach your daily goal!";
    } else if (difference===0){
      message = "Activity added! Congratulations! You reached your daily goal!";
    } else {
      message = "Activity added! Bravo! You were very active today!";
    }
    toast(message,{
      autoClose: 4000,
      className: 'Message-Size-class',
      position: toast.POSITION.TOP_CENTER
    });
  };


  

  // Set an Activity Goal
  const handleSetGoal = () => {
    dispatch({ type: SET_USER_ACTIVITY_GOAL, payload:activityGoal });
    dispatch(setUserActivityGoal(activityGoal));
    setIsEditingGoal(false);  // Set to false after goal is set
  };


  // Toggle Editing Goal Mode
  const toggleEditGoal = () => {
    setIsEditingGoal(true);
  };

  // Toggle Activity History Display
  const toggleActivityHistory = () => {
    setShowActivityHistory(!showActivityHistory);
  };


  return (
    <div className="activity-page">
      <div>
        <h1>Stay Active and Track Your Activities!</h1>

        <div>
          <h2>Set Daily Activity Goal</h2>
          {
            isEditingGoal ? 
            (
              // If editing, display the input field and the SET button
              <>
                <input 
                    type="number"
                    value={activityGoal}
                    onChange={(e) => setActivityGoal(e.target.value)}
                    placeholder="Daily Activity (in minutes)"
                />
                <button onClick={handleSetGoal}>SET</button>
              </>
            ) : 
            (
              // If not editing, display the set goal and the EDIT button
              <>
                <p>Your Current Daily Activity Goal is {activityGoal} minutes per day.</p>
                <button onClick={toggleEditGoal}>Edit</button>
              </>
            )
          }
      </div>
      <h2>Add New Activity </h2>
          <input 
            value={activityType}
            onChange={(e)=> setActivityType(e.target.value)}
            placeholder="Activity Type"
        />
          <input 
            type="number"
            value={activityDuration}
            onChange={(e)=> setActivityDuration(e.target.value)}
            placeholder="Duration (in minutes)"
        />
        <button onClick={handleAddActivity}>Add</button>
            </div>


        <button onClick={toggleActivityHistory}>See the history of activities</button>
        {
          showActivityHistory && (
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Duration (in minutes)</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {/* Map through activities to display them */}
                {activities.map(activity => (
                    <tr key={activity.id}>
                        <td>Type: {activity.type}</td>
                        <td>Duration: {activity.duration} minutes</td>
                        <td>Date: {activity.date.toLocaleDateString()}</td>
                    </tr>
                ))}
              </tbody>
             </table>
          )}
          <button className="btn"><Link to="/">Back to Home Page</Link></button>

    </div>
  );
}

export default ActivityTracker;
