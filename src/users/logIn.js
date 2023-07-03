import React, { useContext, useEffect, useState } from 'react';
import { API_URL, doApiMethod } from '../services/apiService';
import { AuthContext } from '../context';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  useEffect(() => {

  }, [isLoggedIn])

  const handleLogin = async (e) => {
    e.preventDefault();
    const bodyData = {
      email: email,
      password: password
    };
    try {
      const response = await doApiMethod(`${API_URL}/users/login`, 'POST', bodyData);
      // Handle successful login response
      console.log('Login successful:', response.data);
      setIsLoggedIn(true)
      localStorage.setItem('token', response.data.token);
      localStorage.setItem("userId", response.data.userId)
    } catch (error) {
      // Handle login error
      console.error('Login error:', error);
    }

  };

  return (
    <div className="container mt-4 " style={{ maxWidth: '600px' }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            minLength="3" maxLength="99"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      <div className="text-center mt-3">
        <p>Don't have an account? <a href="/user/register">Register</a></p>
      </div>
    </div>
  );
}
