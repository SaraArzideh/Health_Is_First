import { SET_ACTIVITY_GOAL } from '../actions/activityActions';
import {LOGIN_SUCCESS, LOGOUT, SIGNUP_SUCCESS, AUTH_ERROR} from '../actions/authActions';
import {SET_USER_ACTIVITY_GOAL} from '../actions/authActions';

const initialState = {
    user: null,
    isLoggedIn: false,
    error: null,
    activityGoal: null,
    dietGoal: 0,
    currentWeight:0,
    height:0
 };
 
 const authReducer = (state = initialState, action) => {
    switch(action.type) {
       case LOGIN_SUCCESS:
        return {
            ...state,
            user: action.payload,
            isLoggedIn: true,
            error: null
           };
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
        case SET_ACTIVITY_GOAL:
            return{
                ...state,
                user: {
                    ...state.user,
                    activityGoal: action.payload
                }
            };               
        default:
            return state;
    }
 };
 
 export default authReducer;
 