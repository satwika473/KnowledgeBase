import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const LoginForm = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [agreeTnC, setAgreeTnC] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:5000/login', {
        email: form.email,
        password: form.password,
      });

      const { token } = response.data;
      localStorage.setItem('authToken', token);
      localStorage.setItem('userEmail', form.email);

      setSuccess('Login successful!');
      setForm({ email: '', password: '' });
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="login-bg">
      <div className="login-container">
        <div className="login-card">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* T&C Checkbox */}
            

            <button
              type="submit"
              className="submit-btn"
              
            >
              Login
            </button>
          </form>

          {error && <div className="error-msg">{error}</div>}
          {success && <div className="success-msg">{success}</div>}

          {/* Redirect to Sign Up */}
          <div className="signup-link mt-3">
            Don’t have an account? <Link to="/register">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
