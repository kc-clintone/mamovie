import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  //checks if a token already exists then redirects to "/"
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, [navigate]);

  //handlimg form events
  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    // adding dummy "signup" delay
    setTimeout(() => {
      localStorage.setItem('token', 'dummy');
      setLoading(false);
      navigate('/');
    }, 900);
  }
