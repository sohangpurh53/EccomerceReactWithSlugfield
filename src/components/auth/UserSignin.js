import React, { useState } from 'react';
import '../css/auth.css';
import axiosInstance from '../utils/axiosInstance';
import { Link } from 'react-router-dom';


const UserSignin = () => {
  const [userLoginData, setUserLoginData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserLoginData({
      ...userLoginData,
      [name]: value,
    });
  };
  

  const signInForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('token/', userLoginData);

      if (response.status === 200) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        window.location.href = '/'
      } else {
        throw new Error('Invalid login details'); // Throw an error for incorrect credentials
      }
    } catch (error) {
      console.error(error.message); // Log the error message
    }
  };

  return (
    <div className="auth-container">
      <form>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={userLoginData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={userLoginData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" onClick={signInForm}>
          SignIn
        </button>
      </form>
      <Link to={'/signup'} >Signup</Link>
    </div>
  );
};

export default UserSignin;
