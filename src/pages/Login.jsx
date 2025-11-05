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

  return (
    <div className="auth-card">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input name="email" value={form.email} onChange={handleChange} required/>
        </label>
        <label>
          Password
          <input name="password" type="password" value={form.password} onChange={handleChange} required/>
        </label>
        <button className="btn" type="submit" disabled={loading}>
          {loading ? 'Logging you in…' : 'Login'}
        </button>
      </form>
      <small>Dont have an account? sign up.</small>
    </div>
  );
}
