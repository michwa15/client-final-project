import React from "react";
import { Register } from './register/Register';
import { SignIn } from './sign-in/SignIn';
import { NavBar } from './nav-bar/NavBar';
import { NotFound } from './not-found/NotFound';
import { Admin } from './admin-settings/Admin';
import { Products } from "./products/Products";
import { Cart } from "./cart/Cart";
import { Checkout } from "./checkout/Checkout";
import { CheckoutComplete } from "./checkout-complete/CheckoutComplete";
import { Route, Routes } from 'react-router-dom';
import "./App.css";

function App() {

  return (
    <div>
      <NavBar />
      <div className="page-container">
        <Routes>
          <Route exact path="/" element={<Products />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/sign-in" element={<SignIn />} />
          <Route exact path="/admin-settings" element={<Admin />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/checkout" element={<Checkout />} />
          <Route exact path="/checkout/complete" element={<CheckoutComplete />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;