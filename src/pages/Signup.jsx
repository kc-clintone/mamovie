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

  return (
    <div className="auth-card">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input name="name" value={form.name} onChange={handleChange} required/>
        </label>
        <label>
          Email
          <input name="email" value={form.email} onChange={handleChange} required/>
        </label>
        <label>
          Password
          <input name="password" type="password" value={form.password} onChange={handleChange} required/>
        </label>
        <button className="btn" type="submit" disabled={loading}>
          {loading ? 'Signing up…' : 'Sign Up'}
        </button>
      </form>
      <small>Have an account? sign in.</small>
    </div>
  );
}
