import React, { useEffect } from 'react';
import { Counter } from './features/counter/Counter';
import { useForm } from "react-hook-form";
import './App.css';
import Productlist from './features/product-list/components/ProductList';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { createRoot } from "react-dom/client";
import CartPage from './pages/CartPage';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { selectLoggedInUser } from './features/auth/authSlice';
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
import Protected from './features/auth/components/Protected';
import { fetchItemsByUserId } from './features/cart/CartAPI';
import { fetchItemsByUserIdAsync } from './features/cart/CartSlice';
import { useDispatch } from 'react-redux';

const router = createBrowserRouter([
  {
    path: "/",
    element: (<Protected>
          <Home></Home>
      </Protected>),
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
     element:(<Protected><CartPage></CartPage></Protected>)
  },
  {
    path:'/checkout',
    element:(<Protected><Checkout></Checkout></Protected>)
  },
  {
    path:'/product-detail/:id',
    element:(<Protected><ProductDetailPage></ProductDetailPage></Protected>)
  }
]);
function App() {
   const dispatch = useDispatch();
   const user = useSelector(selectLoggedInUser)
   useEffect(()=>{
     if(user){
       dispatch(fetchItemsByUserIdAsync(user.id))
    }
   },[dispatch,user])

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


