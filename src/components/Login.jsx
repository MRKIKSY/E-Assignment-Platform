import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';
import axios from 'axios';

const Login = ({ setRoleVar }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin'); // Default role as 'admin'
  const [error, setError] = useState(''); // Error state for displaying login errors
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('https://e-assignment-platform-backend.onrender.com/auth/login', { username, password, role })
      .then(res => {
        console.log('Response data:', res.data);
        if (res.data.login) {
          // Store JWT in local storage with different keys based on the role
          const tokenKey = role === 'admin' ? 'adminToken' : 'studentToken';
          localStorage.setItem(tokenKey, res.data.token);
          setRoleVar(res.data.role);

          // Navigate based on user role
          if (res.data.role === 'admin') {
            navigate('/dashboard');
          } else if (res.data.role === 'student') {
            navigate('/');
          }
        } else {
          setError(res.data.message); // Set error message
          console.error('Login failed:', res.data.message);
        }
      })
      .catch(err => {
        setError('Error during login. Please try again.');
        console.error('Error during login:', err);
      });
  };

  return (
    <div className='login-page'>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              placeholder='Enter Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder='Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <select
              name="role"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="admin">Teacher</option>
              <option value="student">Student</option>
            </select>
          </div>
          {error && <div className="error-message">{error}</div>} {/* Display error message */}
          <button type="submit" className='btn-login'>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
