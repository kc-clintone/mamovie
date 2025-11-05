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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
