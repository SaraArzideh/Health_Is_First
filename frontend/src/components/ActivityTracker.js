import React from 'react';
import { useState } from 'react';
import{useSelector, useDispatch} from 'react-redux';
import { ADD_ACTIVITY, SET_ACTIVITY_GOAL } from '../actions/activityActions';
import { setUserActivityGoal } from '../actions/authActions';
import * as d3 from 'd3';


function ActivityTracker() {
  const dispatch = useDispatch();
  const activities = useSelector(state => state.activities.activities);
  const userActivityGoal = useSelector(state => state.auth.user?.activityGoal || 0);
  // Create a state to determine if the goal is currently being edited:
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [showActivityHistory, setShowActivityHistory] = useState(false);

  // Add a local state to determine if the goal has been set at least once:
  const [goalSetOnce, setGoalSetOnce] = useState(false);  

  // Fetch the activities and activity goal from the Redux state
  const [activityType, setActivityType] = useState('');
  const [activityDuration, setActivityDuration] = useState('');
  const [activityGoal, setActivityGoal] = useState(userActivityGoal);

  //Add a New Activity
  const handleAddActivity = () => {
    const newActivity = {
      id: Date.now(), // Using current timestamp as a unique id
      type: activityType,
      duration: Number(activityDuration), // Convert string to number
      date: new Date()
    };
    dispatch({type: ADD_ACTIVITY, payload:newActivity});
    window.alert("Activity added! Click 'See the history of activities' to view all activities.");
  };

  // Set an Activity Goal
  const handleSetGoal = () => {
    dispatch({ type: SET_ACTIVITY_GOAL, payload:activityGoal });
    dispatch(setUserActivityGoal(activityGoal));
    setIsEditingGoal(false);  // Toggle the edit mode off
    setGoalSetOnce(true); //Goal has been set
  };


  // Toggle Editing Goal Mode
  const toggleEditGoal = () => {
    setIsEditingGoal(!isEditingGoal);
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
          <input 
              type="number"
              value={activityGoal}
              onChange={(e) => setActivityGoal(e.target.value)}
              placeholder="Daily Activity (in minutes)"
          />
          {
            (isEditingGoal|| !goalSetOnce)?
           <button onClick={handleSetGoal}>SET</button>:
           <button onClick={toggleEditGoal}>EDIT</button>
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
          <button className="btn"><a href="/">Back to Home Page</a></button>

    </div>
  );
}

export default ActivityTracker;
