import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";


/** import pages */
import Home from "./pages/home/Home";
import ProductList from './pages/products/ProductList';
import Product from './pages/products/Product';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Cart from './pages/cart/Cart';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;