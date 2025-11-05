import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  useEffect(() => {
    // this will redirect to home "/" if token already exists
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, [navigate]);

  //hanfle form events
  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  //handling form submit event
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    // addung dummy "auth" delay
    setTimeout(() => {
      localStorage.setItem('token', 'dummy');
      setLoading(false);
      navigate('/');
    }, 700);
  }



