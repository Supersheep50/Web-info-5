import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    fetch('http://localhost:5050/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
          setUserInfo(null);
        } else {
          setUserInfo(data.user);
          setError('');
          localStorage.setItem('userId', data.user.id);
          navigate('/travel-logs');
        }
      })
      
      .catch(err => {
        console.error('Login error:', err);
        setError('Something went wrong');
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Login</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleLogin} className="mb-4">
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button type="submit" className="btn btn-primary">Login</button>
      </form>

      {userInfo && (
        <div className="alert alert-success">
          <h5>Welcome, {userInfo.username}!</h5>
          <p>Email: {userInfo.email}</p>
        </div>
      )}
    </div>
  );
}

export default Login;
