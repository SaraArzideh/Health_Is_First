import {combineReducers} from 'redux';
import authReducer from './authReducer';
import goalReducer from './goalReducer';
import dataReducer from './dataReducer';

const rootReducer= combineReducers({
    auth:authReducer,
    goals:goalReducer,
    data:dataReducer
})
export default rootReducer;