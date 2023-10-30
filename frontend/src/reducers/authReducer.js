import {LOGIN_SUCCESS, LOGOUT, SIGNUP_SUCCESS, AUTH_ERROR} from '../actions/authActions';

const initialState = {
    user: null,
    isLoggedIn: false,
    error: null
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
        default:
            return state;
    }
 };
 
 export default authReducer;
 