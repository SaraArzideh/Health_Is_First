export const ADD_ACTIVITY = "ADD_ACTIVITY";
export const UPDATE_ACTIVITY = "UPDATE_ACTIVITY";
export const SET_ACTIVITY_GOAL = "SET_ACTIVITY_GOAL";
export const FETCH_ACTIVITIES = "FETCH_ACTIVITIES";
export const Activity_GOAL_ERROR = 'Activity_GOAL_ERROR';


// Action creators for activity functionalities.
// Set Activity Goals
export const setActivityGoal = (activityGoal) => {
   return async (dispatch) => {
      try {
         // API call to set Activity goals
         const response = await fetch('SET_GOALS_API_ENDPOINT', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(activityGoal)
         });

         const data = await response.json();

         if (response.ok) {
            dispatch({ type: SET_ACTIVITY_GOAL, payload: data });
         } else {
            dispatch({ type: Activity_GOAL_ERROR, payload: data.message });
         }
      } catch (error) {
         dispatch({ type: Activity_GOAL_ERROR, payload: 'Failed to set goals!' });
      }
   };
};

