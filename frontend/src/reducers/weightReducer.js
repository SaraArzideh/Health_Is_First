import {
UPDATE_WEIGHT_SUCCESS,
UPDATE_WEIGHT_FAIL
} from '../actions/authActions';
const initialState = {
    weights: [],
    currentWeight: null,
};

const weightReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_WEIGHT_SUCCESS:
            return {
                ...state,
                weights: [...state.weights, action.payload]
            };
        case UPDATE_WEIGHT_FAIL:
            return{
                ...state,
                error: action.payload,               
            };        
        default:
            return state;
    }
};
export default weightReducer;