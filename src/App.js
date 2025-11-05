import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import logo from './logo.svg';
import './App.css';

function App() {
  //implememting storage here soon
  const loggedIn = !!localStorage.getItem('token')

  //if a user logs out
  function handleLogout() {
    localStorage.removeItem('token');
    window.location.href = '/login'
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="logo"><Link to="/">Movie Explorer</Link></h1>
        <nav>
          {loggedIn ? (
            <>
              <button className="btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link className="btn" to="/login">Login</Link>
              <Link className="btn" to="/signup">Sign Up</Link>
            </>
          )}
        </nav>
      </header>
    </div>
  );
}

export default App;
