import {SUBMIT_DATA, RETRIEVE_DATA, DATA_ERROR} from '../actions/dataActions';

const initialStte={
    data:{
        weight: [],
        activity: [],
        diet: [],
    },
    error: null,
};

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUBMIT_DATA:
            return {
                ...state,
                data: {
                    ...state.data,
                    ...action.payload,
                },
                error: null,
            };
        
        case RETRIEVE_DATA:
            return {
                ...state,
                data: action.payload,
                error: null,
            };
        
        case DATA_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        
        default:
            return state;
    }
};

export default dataReducer;
