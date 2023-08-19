import React from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import Productlist from './features/product-list/components/ProductList';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { createRoot } from "react-dom/client";
import CartPage from './pages/CartPage';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
// import Cart from './features/cart/Cart';
import { useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Checkout from './pages/Checkout';
import ProductDetail from './features/product-list/components/ProductDetail';
import ProductDetailPage from './pages/ProductDetailPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: (<Home></Home>),
  },
  {
    path:'/login',
    element:(<LoginPage></LoginPage>)
  },{
    path:'/signup',
    element:(<SignupPage></SignupPage>)
  },
  {
     path:'/cart',
     element:(<CartPage></CartPage>)
  },
  {
    path:'/checkout',
    element:(<Checkout></Checkout>)
  },
  {
    path:'/product-detail',
    element:(<ProductDetailPage></ProductDetailPage>)
  }
]);
function App() {
  return(
    // <Home>  </Home>
    // <LoginPage></LoginPage>
    // <SignupPage></SignupPage>
    <div className='App'>
       <RouterProvider router={router} />
    </div> 
  )
}

export default App;


