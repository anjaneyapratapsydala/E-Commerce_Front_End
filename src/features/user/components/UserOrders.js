import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLoggedInUserOrderAsync, selectUserOrders } from '../userSlice';
import { selectLoggedInUser } from '../../auth/authSlice';
// import { selectUserOrders } from '../userSlice';
import { selectUserInfo  } from '../userSlice';
import { Link } from 'react-router-dom';
import { discountedPrice } from '../../../app/constants';
export  default function UserOrders() {
  const user = useSelector(selectUserInfo)
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrders)
  // console.log(user)
  useEffect(()=>{ 
    dispatch(fetchLoggedInUserOrderAsync(user.id))
  },[])

  return (
    <div>
      {orders.map((order)=>(
         <div>
         <div className="mx-auto mt-4 bg-white max-w-3xl px-4 sm:px-6 lg:px-8">
         <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
           <h1 className='text-4xl mb-5 mt-0 font-bold tracking-tight text-gray-900'>
            Order #{order.id}
            </h1>
            <h3 className='text-1xl mb-5 mt-0 font-bold tracking-tight text-red-900'>
            Order Status : {order.status}
            </h3>
         <div className="flow-root">
           <ul role="list" className="-my-6 divide-y divide-gray-200">
             {order.items.map((item) => (
               <li className="flex py-6">
                 <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                   <img
                     src={item.thumbnail}
                     alt={item.title}
                     className="h-full w-full object-cover object-center"
                   />
                 </div>
     
                 <div className="ml-4 flex flex-1 flex-col">
                   <div>
                     <div className="flex justify-between text-base font-medium text-gray-900">
                       <h3>
                         <a href={item.href}>{item.title}</a>
                       </h3>
                       <p className="ml-4">${discountedPrice(item)}</p>
                     </div>
                     <p className="mt-1 text-sm text-gray-500">
                       {item.brand}</p>
                   </div>
                   <div className="flex flex-1 items-end justify-between text-sm">
                     <div className="text-gray-500">
                     <label htmlFor="password" className="inline mr-2 text-sm font-medium leading-6 text-gray-900">
                     Qty
                   </label>
                     </div>
     
                     <div className="flex">
                     </div>
                   </div>
                 </div>
               </li>
             ))}
           </ul>
         </div>
       </div>
     
     
     <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
       <div className="flex justify-between my-2 text-base font-medium text-gray-900">
         <p>Subtotal</p>
         <p>$ {order.totalAmount}</p>
       </div>
       <div className="flex justify-between my-2 text-base font-medium text-gray-900">
         <p>Total Items in Cart</p>
         <p>{order.totalItems} items</p>
       </div>
       <p className="mt-2 text-sm text-gray-500">Shipping Address</p>
       <div key={order.index} className="flex justify-between gap-x-6 py-2">

          <div className="flex min-w-0 gap-x-4 border-solid px-3">
 
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">{order.selectedAddress.name}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{order.selectedAddress.street}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{order.selectedAddress.pinCode}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">Phone: {order.selectedAddress.phone}</p>
            <p className="text-sm leading-6 text-gray-500">{order.selectedAddress.city}</p>
          </div>
        </div>
     </div>
        </div>
        </div>
      ))}
    </div>
  )
}
