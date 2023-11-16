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
  const user = useSelector((state) => state.auth.user);

  const handleLogout= ()=>{
    dispatch (logoutUser());
  };
  let navigationLinks;
  if (isLoggedIn){
    navigationLinks=(
      <>
        <span className="navbar-text welcome-message"> 💡 {user.username ||'Guest'}</span>
        <button onClick={handleLogout}>Logout</button>
        <Link to="/profile" className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`}>Profile</Link> 
      </>
    );
  } else {
    navigationLinks=(
      <>
        { !isSignUpPage && <Link to="/signup" className="navbar-links">Sign Up</Link> }
        { !isLoginPage && <Link className="navbar-links" to="/login">Login</Link> }
      </>
    );
  }
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="logo-container">
            <img src={logo} alt="HealthIsFirst" className="logo" />
            <h2 className="navbar-brand" style={{marginLeft:10}}>Health Is First</h2>
        </div>
        <div className="navbar-links">
            { !isHomePage && <Link to="/" className={`nav-item'${!location.pathname !== '/' ?'active': ''}`}>Home</Link> }
            { !isDashboard && <Link to="/dashboard" className={`nav-item'${!location.pathname === '/dashboard' ?'active': ''}`}>Dashboard</Link> }
            { !isActivityTracker && <Link to="/activity" className={`nav-item'${!location.pathname === '/activity' ?'active': ''}`}>Activity</Link> }
            { !isBodyMetrics && <Link to="/weight" className={`nav-item'${!location.pathname === '/weight' ?'active': ''}`}>Body-Metrics</Link> }
            { !isNutritionTracker && <Link to="/diet" className={`nav-item'${!location.pathname === '/diet' ?'active': ''}`}>Diet</Link> }
        </div>
        <div className="ml-auto">
          {navigationLinks}
        </div>
    </nav>
  );
}

export default Navbar;
