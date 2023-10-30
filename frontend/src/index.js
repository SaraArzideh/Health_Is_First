import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Redux imports
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// Reducer imports
import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import goalReducer from './reducers/goalReducer';
import dataReducer from './reducers/dataReducer';

// Provider allows the Redux store to be passed down to components
import { Provider } from 'react-redux';

// Combining reducers
const rootReducer = combineReducers({
  auth: authReducer,
  goals: goalReducer,
  data: dataReducer

});
// Creating the Redux store with the combined reducer and middleware
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(
      applyMiddleware(thunk),
  )
);

// Creating the root for ReactDOM
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the main App component and wrapping it with Redux's Provider
root.render(
  <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
  </React.StrictMode>
);
// Reporting web vitals (for performance measurements, etc.)
reportWebVitals();