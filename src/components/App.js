import React from "react";
import { Register } from './register/Register';
import { SignIn } from './sign-in/SignIn';
import { NavBar } from './nav-bar/NavBar';
import { NotFound } from './not-found/NotFound';
import { Route, Routes } from 'react-router-dom';
import "./App.css";

function App() {

  const Data = () => {
    return (
      <h1>hi</h1>
    )
  }

  return (
    <div>
      <NavBar />
      <div className="page-container">
        <Routes>
          <Route exact path="/" element={<Data />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/products" element={<Data />} />
          <Route exact path="/sign-in" element={<SignIn />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;