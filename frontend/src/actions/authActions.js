// Action Types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const AUTH_ERROR = 'AUTH_ERROR';

// Action Creators

// Login User
export const loginUser = (credentials) => {
   return async (dispatch) => {
      try {
         // Asynchronous call to API for login, using fetch or axios
         const response = await fetch('YOUR_LOGIN_API_ENDPOINT', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
         });

         const userData = await response.json();

         if (response.ok) {
            dispatch({ type: LOGIN_SUCCESS, payload: userData });
         } else {
            dispatch({ type: AUTH_ERROR, payload: userData.message });
         }
      } catch (error) {
         dispatch({ type: AUTH_ERROR, payload: 'Login failed!' });
      }
   };
};

// Signup User
export const signupUser = (userInfo) => {
   return async (dispatch) => {
      try {
         // API call for signup
         const response = await fetch('YOUR_SIGNUP_API_ENDPOINT', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
         });

         const data = await response.json();

         if (response.ok) {
            dispatch({ type: SIGNUP_SUCCESS, payload: data });
         } else {
            dispatch({ type: AUTH_ERROR, payload: data.message });
         }
      } catch (error) {
         dispatch({ type: AUTH_ERROR, payload: 'Signup failed!' });
      }
   };
};

// Logout User
export const logoutUser = () => {
   return (dispatch) => {
      // Clear user data or perform other cleanup tasks
      dispatch({ type: LOGOUT });
   };
};
