import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { signup } from "../../api/auth";
import { errors } from "../../helpers/messages";
import { isAuthenticated } from "../../helpers/auth";

import "./Register.css";

export const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if(isAuthenticated()) {
      navigate('/products');
    }
  }, [navigate])

  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    password: '',
    errorMessages: {},
  });

  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();

    const { fullname, username, password } = formData;
    const data = { fullname, username, password };
    try {
      await signup(data);
      setFormData({
        ...formData,
        username: '',
        password: '',
        errorMessages: {}
      })
      console.log('Axios sign up succeed');
      navigate('/sign-in');
    } catch (err) {
      const errMessage = err.response.data.errorMessage;
      const msg = errMessage.includes('6') ? { name: "pass", message: errors.shortPass } : { name: "uname", message: errMessage };
      setFormData({ ...formData, errorMessages: { ...msg } });
    }
  };

  const renderErrorMessage = (name) =>
    name === formData.errorMessages.name && (
      <div className="error">{formData.errorMessages.message}</div>
    );

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Full name </label>
          <input type="text" name="fullname" value={formData.fullname} placeholder="Enter your full name" onChange={handleInputChange} required />
        </div>
        <div className="input-container">
          <label>Username </label>
          <input type="email" name="username" value={formData.username} placeholder="Enter your mail" required onChange={handleInputChange} />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="password" value={formData.password} placeholder="Enter your password" required onChange={handleInputChange} />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" value="Sign Up" />
        </div>
      </form>
      <div className="has-account">
        <p>Already have an account?</p> 
          <Link to='/sign-in'>Sign In ↗️</Link>
      </div>
    </div>
  );

  return (
    <div className="register">
      <div className="login-form">
        <div className="title">Register</div>
        {renderForm}
      </div>
    </div>
  );
}
