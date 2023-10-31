import React from 'react';
import { useState } from 'react';
import{useSelector, useDispatch} from 'react-redux';
import { ADD_ACTIVITY, SET_ACTIVITY_GOAL } from '../actions/activityActions';
import * as d3 from 'd3';


function ActivityTracker() {
  const dispatch = useDispatch();
  const activities = useSelector(state => state.activities.activities);
  const activityGoal = useSelector(state => state.activities.activityGoal);

  // Fetch the activities and activity goal from the Redux state
  const [activityType, setActivityType] = useState('');
  const [activityDuration, setActivityDuration] = useState('');

  //Add a New Activity
  const handleAddActivity = () => {
    const newActivity = {
      id: Date.now(), // Using current timestamp as a unique id
      type: activityType,
      duration: Number(activityDuration), // Convert string to number
      date: new Date()
    };
    dispatch({type: ADD_ACTIVITY, payload:newActivity});
  };

  // Set an Activity Goal
  const handleSetGoal = (goal) => {
     dispatch({ type: SET_ACTIVITY_GOAL, payload:goal });
  };

  return (
    <div className="activity-page">
      <div>
        <h1>Stay Active and Track Your Activities!</h1>
          <input 
            value={activityType}
            onChange={(e)=> setActivityType(e.target.value)}
            placeholder="Activity Type"
        />
          <input 
            type="number"
            value={activityDuration}
            onChange={(e)=> setActivityDuration(e.target.value)}
            placeholder="Duration(in minutes)"
        />
        <button className="btn"><a href="/">Back to Home Page</a></button>
        <button onClick={handleAddActivity}>Add Activity</button>
            </div>
            <div>
                <h2>Set Daily Activity Goal</h2>
                <input 
                    type="number"
                    value={activityGoal}
                    onChange={(e) => handleSetGoal(e.target.value)}
                    placeholder="Goal (in minutes)"
                />
            </div>
            <div>
              {/* Map through activities to display them */}
              {activities.map(activity => (
                  <div key={activity.id}>
                      <p>Type: {activity.type}</p>
                      <p>Duration: {activity.duration} minutes</p>
                      <p>Date: {activity.date.toLocaleDateString()}</p>
                  </div>
              ))}
          </div>
    </div>
  );
}

export default ActivityTracker;
