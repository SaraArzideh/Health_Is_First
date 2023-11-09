import {
    LOGIN_SUCCESS,
    LOGOUT, SIGNUP_SUCCESS,
    AUTH_ERROR,
    SET_USER_ACTIVITY_GOAL,
    SET_USER_DIET_GOAL,
    SET_USER 
} from '../actions/authActions';

const initialState = {
    user: null,
    isLoggedIn: false,
    error: null,
    activityGoal: null,
    dietGoal: null,
    currentWeight:null,
};
 
 const authReducer = (state = initialState, action) => {
    switch(action.type) {
       case LOGIN_SUCCESS:
       case SIGNUP_SUCCESS:
            return {
             ...state,
             user: action.payload,
             isLoggedIn: true,
             error: null
            };
       case LOGOUT:
            return {
             ...state,
             user: null,
             isLoggedIn: false,
             error: null
            };
        case AUTH_ERROR:
            return{
                ...state,
                error: action.payload,               
            }
        case SET_USER_ACTIVITY_GOAL:
            return{
                ...state,
                user: {
                    ...state.user,
                    activityGoal: action.payload
                }
            }; 

        case SET_USER_DIET_GOAL:
            return{
                ...state,
                user: {
                    ...state.user,
                    dietGoal: action.payload
                }
            }; 
        case SET_USER:
            return{
                ...state,
                user: action.payload,
                isLoggedIn: true,
                error:null, 
            }          
        default:
            return state;
    }
 };
 
 export default authReducer;
 