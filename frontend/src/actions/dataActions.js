//For handling non-auth user data(setting, history, ...)

import { useState } from "react";

// Action Types
export const SUBMIT_DATA = 'SUBMIT_DATA';
export const RETRIEVE_DATA = 'RETRIEVE_DATA';
export const DATA_ERROR = 'DATA_ERROR';

export const ADD_CURRENT_WEIGHT = "ADD_CURRENT_WEIGHT";
export const EDIT_CURRENT_WEIGHT = "EDIT_CURRENT_WEIGHT";
export const FETCH_WEIGHTS = "FETCH_WEIGHTS";
export const CURRENT_WEIGHT_ERROR = "CURRENT_WEIGHT_ERROR";


export const SET_USER_DIET_GOAL = "SET_USER_DIET_GOAL";
export const EDIT_DIET_GOAL = "EDIT_DIET_GOAL";
export const FETCH_DIETS = "FETCH_DIETS";
export const DIET_GOAL_ERROR = 'DIET_GOAL_ERROR';

// Action Creators

// Fetch weights
const FetchWeightData = async () => {
   const [weightData, setWeightData] = useState([]);
   const response = await fetch('/:weightId');
   const data = await response.json();
   setWeightData(data);
};

// Submit Data
export const submitData = (data) => {
   return async (dispatch) => {
      try {
         // API call to submit data
         const response = await fetch('http:/localhost:5000//submit', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
         });

         const responseData = await response.json();

         if (response.ok) {
            dispatch({ type: SUBMIT_DATA, payload: responseData });
         } else {
            dispatch({ type: DATA_ERROR, payload: responseData.message });
         }
      } catch (error) {
         dispatch({ type: DATA_ERROR, payload: 'Failed to submit data!' });
      }
   };
};

// Update Data
export const retrieveData = () => {
   return async (dispatch) => {
      try {
         // API call to retrieve data
         const response = await fetch('http://localhost:5000/update');
         const data = await response.json();

         if (response.ok) {
            dispatch({ type: RETRIEVE_DATA, payload: data });
         } else {
            dispatch({ type: DATA_ERROR, payload: data.message });
         }
      } catch (error) {
         dispatch({ type: DATA_ERROR, payload: 'Failed to retrieve data!' });
      }
   };
};
