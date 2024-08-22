import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/Admin.css';

const LoginAdmin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/admin/login', {
        username,
        password,
      });
      
      if (response.data.status === 'success') {
        console.log('You are logged in');
        navigate('/admin/categories');      
      }
    } catch (error) {
      console.error(error.response.data.message);
      alert('Invalid username or password');
    }
  };

  return (
    <div className="unique-login-container">
      <div className="unique-login-box">
        <h2>Welcome To Admin Panel</h2>
        <form onSubmit={handleLogin}>
          <div className="unique-input-group">
            <input
              type="text"
              placeholder="Enter Your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <span className="unique-icon">👤</span>
          </div>
          <div className="unique-input-group">
            <input
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="unique-icon">🔒</span>
          </div>
          <button className="unique-admin-btn" type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;
