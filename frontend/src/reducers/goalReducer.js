import {SET_GOALS, RETRIEVE_GOALS, GOAL_ERROR} from '../actions/goalActions';
const initialState = {
    goals: {},
    error: null,
};

const goalReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_GOALS:
        case RETRIEVE_GOALS:
            return {
                ...state,
                goals: action.payload,
                error: null,
            };
        
        case GOAL_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        
        default:
            return state;
    }
};

export default goalReducer;
