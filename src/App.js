import React, { useEffect } from 'react';
import { Counter } from './features/counter/Counter';
import { useForm } from "react-hook-form";
import './App.css';
import Productlist from './features/product/components/ProductList';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { createRoot } from "react-dom/client";
import CartPage from './pages/CartPage';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { selectLoggedInUser } from './features/auth/authSlice';
import UserOrders from './features/user/components/UserOrders';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import AdminHome from './pages/AdminHome';
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
import ProductDetail from './features/product/components/ProductDetail';
import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/auth/components/Protected';
import { fetchItemsByUserId } from './features/cart/CartAPI';
import { fetchItemsByUserIdAsync } from './features/cart/CartSlice';
import { useDispatch } from 'react-redux';
import PageNotFound from './pages/404';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrdersPage from './pages/UserOrdersPage';
import UserProfile from './features/user/components/UserProfile';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUser } from './features/user/userAPI';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import { selectUserInfo } from './features/user/userSlice';
import Logout from './features/auth/components/Logout';
import ForgotPassWordPage from './pages/ForgotPassWordPage';
import AdminProductDetailPage from './pages/AdminProductDetailPage';
import ProductForm from './features/admin/components/ProductForm';
import AdminProductFormPage from './pages/AdminProductFormPage';
const router = createBrowserRouter([
  {
    path: "/",
    element: (<Protected>
          <Home></Home>
      </Protected>),
  },
  {
    path: "/admin",
    element: (<ProtectedAdmin>
          <AdminHome></AdminHome>
      </ProtectedAdmin>),
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
  },
  {
    path:'/admin/product-detail/:id',
    element:(<ProtectedAdmin><AdminProductDetailPage></AdminProductDetailPage></ProtectedAdmin>)
  },
  {
    path:'/ordersuccess/:id',
    element:(
    <OrderSuccessPage>
    </OrderSuccessPage>
   )
  },
  {
    path:'/orders',
    element:(
    <UserOrdersPage></UserOrdersPage>
   )
  },
  {
    path:'/profile',
    element:(
    <UserProfilePage></UserProfilePage>
   )
  },
  {
    path:'/logout',
    element:(
    <Logout></Logout>
   )
  },
  {
    path:'/forgot-password',
    element:(
    <ForgotPassWordPage></ForgotPassWordPage>
   )
  },
  {
    path:'/admin/product-form',
    element:(
    <AdminProductFormPage></AdminProductFormPage>
   )
  },
  {
    path:'/admin/product-form/edit/:id',
    element:(
    <AdminProductFormPage></AdminProductFormPage>
   )
  },
  {
    path:'*',
    element:(
    <PageNotFound>
    </PageNotFound>
   )
  },
]);
function App() {
   const dispatch = useDispatch();
   const user = useSelector(selectLoggedInUser)
   useEffect(()=>{
     if(user){
       dispatch(fetchItemsByUserIdAsync(user.id))
       dispatch(fetchLoggedInUserAsync(user.id))
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


