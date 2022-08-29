import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { signin } from "../../api/auth";
import { setAuthentication, isAuthenticated} from "../../helpers/auth";

import './SignIn.css';

export const SignIn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if(isAuthenticated()) {
      navigate('/products');
    }
  }, [navigate])

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    errorMessages: {},
    isRemembered: false,
    isAdmin: false
  })

  const toggleRememberMe = () => {
    setFormData(formData => ({ ...formData, isRemembered: !formData.isRemembered }));
  }

  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();

    const { email, password, isRemembered } = formData;
    const data = { email, password, isRemembered };
    try {
      const response = await signin(data);
      const { token, user } = response.data;
      const expires = isRemembered ? 10 : 1/48;
      setAuthentication(token, user, expires);

      setFormData({
        email: '',
        password: '',
        errorMessages: {},
        isRemembered: false,
        isAdmin: false
      })
      navigate('/products');
    } catch (err) {
      console.log('Sign in error');
      const errMessage = err.response.data.errorMessage;
      const msg = errMessage.toLowerCase().includes('pass') ? { name: "pass", message: errMessage } : { name: "email", message: errMessage };
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
      <form onSubmit={handleSubmit} noValidate>
        <div className="input-container">
          <label>Email </label>
          <input type="email" name="email" value={formData.email} placeholder="Enter your mail" onChange={handleInputChange} required />
          {renderErrorMessage("email")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="password" value={formData.password} placeholder="Enter your password" onChange={handleInputChange} required />
          {renderErrorMessage("pass")}
        </div>
        <div className="checkbox-container">
          <label>Remember me </label>
          <input type="checkbox" name="checkbox" onChange={toggleRememberMe} />
        </div>
        <div className="button-container">
          <input type="submit" value="Sign In" />
        </div>
      </form>
      <div className="has-account">
        <p>Don't have an account?</p> 
          <Link to='/register'>Register ↗️</Link>
      </div>
    </div>
  );

  return (
    <div className="sign-in">
      <div className="login-form">
        <div className="title">Login</div>
        {renderForm}
      </div>
    </div>
  );
}
