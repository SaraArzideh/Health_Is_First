import React from 'react';
import {Link} from 'react-router-dom'


const logo=require('./logo.png');

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="logo-container">
            <img src={logo} alt="HealthIsFirst" className="logo" />
            <h2>Health Is First</h2>
        </div>
        <div className="navbar-links">
            <a href="/dashboard">Dashboard</a>
            <a href="/activity">Activity</a>
            <a href="/weight">Weight</a>
            <a href="/diet">Diet</a>
            <a href="/login">Signup/Login</a>
        </div>
    </nav>

  );
}

export default Navbar;
