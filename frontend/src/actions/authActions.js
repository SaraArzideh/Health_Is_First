
// Action Types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const AUTH_ERROR = 'AUTH_ERROR';
export const UPDATE_USER = "UPDATE_USER";
export const SET_USER_ACTIVITY_GOAL = 'SET_USER_ACTIVITY_GOAL';
export const SET_USER_TODAY_DIET = 'SET_USER_TODAY_DIET';
export const SET_USER_TOTAL_TODAY_DIET = 'SET_USER_TOTAL_TODAY_DIET';
export const SET_USER_OPTIMAL_DIET = 'SET_USER_OPTIMAL_DIET';
export const SET_USER_CURRENT_WEIGHT ='SET_USER_CURRENT_WEIGHT';
export const SET_USER= 'SET_USER';

// Action Creators

//User Activity Goal
export const setUserActivityGoal = (activityGoal) => {
   return {
       type: SET_USER_ACTIVITY_GOAL,
       payload: activityGoal
   };
};

// User Current Weight
export const setUserCurrentWeight = (currentWeight) => {
   return {
       type: SET_USER_CURRENT_WEIGHT,
       payload: currentWeight
   };
};

// User Diet Goal
export const setUserTodayDiet = (todayDiet) => {
   console.log("Dispatching setUserTodayDiet with payload: ", todayDiet); //Debugging checker
   return {
       type: SET_USER_TODAY_DIET,
       payload: todayDiet
   };
};

export const setUsertotalTodayDiet = (totalTodayDiet) => {
   console.log("Dispatching setUserTodayDiet with payload: ", totalTodayDiet); //Debugging checker
   return {
       type: SET_USER_TOTAL_TODAY_DIET,
       payload: totalTodayDiet
   };
};

 export const setUserOptimalDiet = (optimalDiet)=>{
   return {
      type: SET_USER_OPTIMAL_DIET,
      payload: optimalDiet
 };
};

// Login User
export const loginUser = (credentials) => async (dispatch) => {
      try {
         // Asynchronous call to API for login, using fetch
         const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(credentials)
         });
         const data = await response.json();

         if (response.ok) {
            localStorage.setItem('token', data.token); // Store token
            dispatch({ type: LOGIN_SUCCESS, payload: data.user });
            dispatch({ type: SET_USER, payload: data.user });
         } else {
            dispatch({ type: AUTH_ERROR, payload: data.message });
         }
      } catch (error) {
         dispatch({ type: AUTH_ERROR, payload: 'Login failed!' });
      }
   };

// Signup User
export const signupUser = (userInfo) => {
   return async (dispatch) => {
      try {
         // API call for signup
         const response = await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userInfo)
         });

         const data = await response.json();

         if (response.ok) {
            localStorage.setItem('user', JSON.stringify(data.user));
            dispatch({ type: SIGNUP_SUCCESS, payload: data.user });
         } else {
            dispatch({ type: AUTH_ERROR, payload: data.message });
         }
      } catch (error) {
         dispatch({ type: AUTH_ERROR, payload: 'Signup failed!' });
      }
   };
};

// update user's profile
export const updateUser=(user)=>{
   return async (dispatch, getState) => {
      try {
         // API call for update
         const response = await fetch('http://localhost:5000/profile', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
         });

         const data = await response.json();

         if (response.ok) {
            localStorage.setItem('user', JSON.stringify(data.user));
            dispatch({ type: UPDATE_USER, payload: data.user });
         } else {
            dispatch({ type: AUTH_ERROR, payload: data.message });
         }
      } catch (error) {
         dispatch({ type: AUTH_ERROR, payload: 'Profile Update failed!' });
      }
   };
};

// Logout User
export const logoutUser = () => {
   localStorage.removeItem('token'); // Remove token from storage
   localStorage.removeItem('user');
   return (dispatch) => {
      dispatch({ type: LOGOUT });
   };
};

//load the user data from local storage 
export const loadUser=()=>{
   const userData=localStorage.getItem('user');
   if (userData) {
      return {
       type:SET_USER, payload: JSON.parse(userData)};
   } else {
      return{
      type:AUTH_ERROR, payload: 'No user data'};
   }
};