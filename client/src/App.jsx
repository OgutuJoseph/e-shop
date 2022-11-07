import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from 'react-redux';


/** import pages */
import Home from './pages/home/Home';
import ProductList from './pages/products/ProductList';
import Product from './pages/products/Product';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Cart from './pages/cart/Cart';
import Success from './pages/success/Success';

const App = () => {

  const user = useSelector((state) => state.user.currentUser);

  return (
    <Router>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/products/:category">
        <ProductList />
      </Route>
      <Route path="/product/:id">
        <Product />
      </Route>
      <Route path="/cart">
        <Cart />
      </Route>
      <Route path="/success">
        <Success />
      </Route>
      <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
      <Route path="/register">
        {user ? <Redirect to="/" /> : <Register />}
      </Route>
    </Switch>
  </Router>
  );
};

export default App;