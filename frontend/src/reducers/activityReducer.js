import { ADD_ACTIVITY, UPDATE_ACTIVITY, SET_ACTIVITY_GOAL, FETCH_ACTIVITIES } from '../actions/activityActions';

const initialState={
    activities:[],   //{ id:uniqueId, type: string, duration: number, date: Date },
    activityGoal: 0 //daily activity duration in minutes
};

const activityReducer = (state = initialState, action) => {
   switch (action.type) {
        case ADD_ACTIVITY:
            // Add the new activity to the state
            return {
                ...state,
                activities: [...state.activities, action.payload]
            };
        case UPDATE_ACTIVITY:
            // Find the activity to update using its id, and replace it with the updated version
            const updatedActivities = state.activities.map(activity => 
                activity.id === action.payload.id ? action.payload : activity
            );
            return {
                ...state,
                activities: updatedActivities
            };
        case SET_ACTIVITY_GOAL:
            // Update the activity goal in the state
            return {
                ...state,
                activityGoal: action.payload
            };
        case FETCH_ACTIVITIES:
            // fetching activities from backend is expected.but If action.payload contains the fetched activities:
            return {
                ...state,
                activities: action.payload
            };
        default:
            return state;
   }
};

export default activityReducer;