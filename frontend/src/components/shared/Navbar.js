import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import {Link, useLocation} from 'react-router-dom';

const logo=require('./logo.png');

function Navbar() {
  const location = useLocation();
  const isHomePage = location.pathname==="/";
  const isDashboard = location.pathname==="/dashboard";
  const isActivityTracker = location.pathname==="/activity";
  const isBodyMetrics = location.pathname==="/weight";
  const isNutritionTracker = location.pathname==="/diet";
  const isSignUpPage = location.pathname==="/signup";
  const isLoginPage = location.pathname==="/login";
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);
  const username = useSelector(state => state.auth.user?.username);
  const handleLogout= ()=>{
    dispatch (logoutUser());
  };
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="logo-container">
            <img src={logo} alt="HealthIsFirst" className="logo" />
            <h2 className="navbar-brand" style={{marginLeft:10}}>Health Is First</h2>
        </div>
        <div className="navbar-links">
            { !isHomePage && <Link to="/">Home</Link> }
            { !isDashboard && <Link to="/dashboard">Dashboard</Link> }
            { !isActivityTracker && <Link to="/activity">Activity</Link> }
            { !isBodyMetrics && <Link to="/weight">Weight</Link> }
            { !isNutritionTracker && <Link to="/diet">Diet</Link> }
        </div>
        {isLoggedIn?(
            <>
              <span className="navbar-text welcome-message">Welcome, {username}!</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ):(
            <>
            { !isSignUpPage && <Link to="/signup" className="navbar-links">Sign Up</Link> }
            { !isLoginPage && <Link className="navbar-links" to="/login">Login</Link> }
            </>
          )}
    </nav>

  );
}

export default Navbar;
