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
      
    </div>
  );
}

export default App;
