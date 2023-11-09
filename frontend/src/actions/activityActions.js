export const ADD_ACTIVITY = "ADD_ACTIVITY";
export const EDIT_ACTIVITY = "EDIT_ACTIVITY";
export const SET_USER_ACTIVITY_GOAL = "SET_USER_ACTIVITY_GOAL";
export const FETCH_ACTIVITIES = "FETCH_ACTIVITIES";
export const Activity_GOAL_ERROR = 'Activity_GOAL_ERROR';


// Action creators for activity functionalities.
//User Activity Goal
export const setUserActivityGoal = (activityGoal) => {
   return async (dispatch) => {
      try {
         const response = await fetch('/activity', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(activityGoal)
         });

         const data = await response.json();

         if (response.ok) {
            dispatch({ type: SET_USER_ACTIVITY_GOAL, payload: data });
         } else {
            dispatch({ type: Activity_GOAL_ERROR, payload: data.message });
         }
      } catch (error) {
         dispatch({ type: Activity_GOAL_ERROR, payload: 'Failed to set goals!' });
      }
   };
};

