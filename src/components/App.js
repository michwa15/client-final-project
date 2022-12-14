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
import { About } from "./about/About";
import { Map } from './map/Map';
import { Review } from './review/Review';
import { Route, Routes } from 'react-router-dom';
import "./App.css";
import { NewProduct } from "./admin-settings/AdminPermission/product-setting/new-product/NewProduct";
import { ReadMeMichael } from "./readme/ReadMeMichael";
import { ReadMeDan } from "./readme/ReadMeDan";

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
          <Route exact path="/admin/add" element={<NewProduct />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/find-us" element={<Map />} />
          <Route exact path="/reviews" element={<Review />} />
          <Route exact path="/readme/michael" element={<ReadMeMichael />} />
          <Route exact path="/readme/dan" element={<ReadMeDan />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;