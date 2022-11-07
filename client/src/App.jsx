import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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

  // const user = useSelector((state) => state.user.currentUser);
  
  const ProtectedRoute = ({ children }) => {

    const user = useSelector((state) => state.user.currentUser);

    if (!user)
    {
      return <Navigate to='/login' />
    }

    return children;

  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/products/:category' element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
        <Route path='/product/:id' element={<ProtectedRoute><Product /></ProtectedRoute>} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />}></Route>
        <Route path='/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path='/success' element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;