import {
    LOGIN_SUCCESS,
    LOGOUT,
    SIGNUP_SUCCESS,
    AUTH_ERROR,
    SET_USER_ACTIVITY_GOAL,
    SET_USER_TODAY_DIET,
    SET_USER 
} from '../actions/authActions';

const initialState = {
    user: null,
    isLoggedIn: false,
    error: null,
    activityGoal: null,
    todayDiet: null,
    currentWeight:null,
};
 
 const authReducer = (state = initialState, action) => {
    switch(action.type) {
       case LOGIN_SUCCESS:
       case SIGNUP_SUCCESS:
       case SET_USER:
            return {
             ...state,
             user: action.payload,
             isLoggedIn: true,
             error: null
            };
       case LOGOUT:
            return {
             ...initialState,
            };
        case AUTH_ERROR:
            return{
                ...state,
                error: action.payload,               
            };
        case SET_USER_ACTIVITY_GOAL:
            return{
                ...state,
                user: {
                    ...state.user,
                    activityGoal: action.payload
                }
            }; 

        case SET_USER_TODAY_DIET:
            return{
                ...state,
                user: {
                    ...state.user,
                    todayDiet: action.payload
                }
            };        
        default:
            return state;
    }
 };
 
 export default authReducer;
 