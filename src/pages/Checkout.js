import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { selectItems } from '../features/cart/CartSlice'
import { deleteItemFromCart } from '../features/cart/CartAPI'
import { deleteItemFromCartAsync } from '../features/cart/CartSlice'
import { Navigate } from 'react-router-dom'
import { dispatch } from 'react'
import { updateCartAsync } from '../features/cart/CartSlice'
import { useDispatch } from 'react-redux'
import { useForm } from "react-hook-form";
import { selectLoggedInUser, updateUserAsync } from '../features/auth/authSlice'
import { createOrderAsync, selectCurrentOrder } from '../features/order/orderSlice'
import { selectUserInfo } from '../features/user/userSlice'
import { discountedPrice } from '../app/constants'


  
  export default function Checkout() {
    const items = useSelector(selectItems);
    const { register, 
      handleSubmit,
      reset,
      formState: { errors } } = useForm();
      const [open, setOpen] = useState(true)
      const user = useSelector(selectUserInfo);
      console.log(user.target)
     const dispatch = useDispatch()
     const totalAmount = items.reduce((amount,item)=>discountedPrice(item)*item.quantity + amount,0)
     const totalItems = items.reduce((total,item)=>item.quantity + total,0)
   
     const [selectedAddress,setSelectedAddress]  = useState(null);
     const [paymentMethod,setPaymentMethod]  = useState('cash');

     const handleQuantity = (e,item)=>{
        dispatch(updateCartAsync({...item,quantity:+e.target.value}))
     }
     const handleRemove = (e,id)=>{
       dispatch(deleteItemFromCartAsync(id))
     }
     const handleAddress = (e)=>{
      // console.log(e.target.value)
      setSelectedAddress(user.addresses[e.target.value])
     }
     const handlePayment = (e)=>{
        setPaymentMethod(e.target.value);
     }
     const currentOrder = useSelector(selectCurrentOrder)

     const handleOrder = (e)=>{
      const order = {items,
        totalAmount,
        totalItems,
        user,
        paymentMethod,
        selectedAddress,
        status:'pending'
      }
      dispatch(createOrderAsync(order))
   }  
  return (
    <>
    {!items.length &&  <Navigate to='/' replace={true}></Navigate>}
    {currentOrder &&  <Navigate to={`/ordersuccess/${currentOrder.id}`} replace={true}></Navigate>}
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-x-8  mt-10 gap-y-10 lg:grid-cols-5">
        <div className='lg:col-span-3'>
    <form className='bg-white mt-0' noValidate
         onSubmit={handleSubmit((data)=>{
          console.log(data)
          dispatch(updateUserAsync({...user,addresses:[...user.addresses,data]})
          );
          reset();
      })}>
    <div className="space-y-12">
        <div className="border-b px-10 border-gray-900/10 pb-12">
          <h2 className="text-2xl font-semibold leading-7 mt-0 pt-4 text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Full name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('name',{required:'name is required'})}
                  id="name"
                
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register('email',{required:'email is required'})}
                  type="email"
                  
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                Phone Number
              </label>
              <div className="mt-2">
              <input
                  id="phone"
                  {...register('phone',{required:'phone is required'})}
                  type="tel"
                  
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                Street address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('street',
                {required:'name is required'})}
                  id="street"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('city',{required:'city is required'})}
                  id="city"
                 
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                State / Province
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('state',{required:'state is required'})}
                  id="state"
                
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-gray-900">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('pinCode',{required:'pinCode is required'})}
                  id="pinCode"
                  
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center mt-3 -py-5 px-5 justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Reset
        </button>
        <button
          type="submit"
          
          className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Address
        </button>
      </div>
        <div className="border-b px-5 border-gray-900/10">
          <h2 className="text-base font-semibold  leading-7 text-gray-900">
            Address</h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">
          Choose From Existing Addresses
          </p>
          <ul role="list" className="divide-y divide-gray-100">
      { user.addresses.map((address,index) => (
        <li key={index} className="flex justify-between gap-x-6 py-5">

          <div className="flex min-w-0 gap-x-4 border-solid px-3">
          <input
          onChange={handleAddress}
                    name="address"
                    type="radio"
                    value={index}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.street}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.pinCode}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">Phone: {address.phone}</p>
            <p className="text-sm leading-6 text-gray-500">{address.city}</p>
          </div>
        </li>
      ))}
    </ul>
          <div className="mt-5 space-y-10">
         
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">Payments</legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">Choose</p>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="cash"
                    name="payments"
                    onChange={handlePayment}
                    type="radio"
                    value="cash"
                    checked={paymentMethod==="cash"}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="cash" className="block text-sm font-medium leading-6 text-gray-900">
                    Cash
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="card"
                    name="payments"
                    onChange={handlePayment}
                    type="radio"
                    value="card"
                    checked={paymentMethod==="card"}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="cash" className="block text-sm font-medium leading-6 text-gray-900">
                    Card Payment
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </form>
    </div>
   
    <div className='lg:col-span-2'>
    <div className="mx-auto mt-0 bg-white max-w-3xl px-2 sm:px-2 lg:px-2">
    <div className="border-t border-gray-200 px-4 py-2 sm:px-6">
      <h1 className='text-4xl mb-5 mt-0 font-bold tracking-tight text-gray-900'>Cart</h1>
    <div className="flow-root">
      <ul role="list" className="-my-6 divide-y divide-gray-200">
        {items.map((item) => (
          <li key={item.id} className="flex py-6">
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
                
                 <select onChange={(e)=>handleQuantity(e,item)} value={item.quantity}>
                 <option value="1">1</option>
                 <option value="2">2</option>
                 <option value="3">3</option>
                 <option value="4">4</option>
                 <option value="5">5</option>
                 <option value="6">6</option>
                 </select>
  
                </div>

                <div className="flex">
                  <button
                  onClick={(e)=>{handleRemove(e,item.id)}}
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Remove
                  </button>
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
    <p>$ {totalAmount}</p>
  </div>
  <div className="flex justify-between my-2 text-base font-medium text-gray-900">
    <p>Total Items in Cart</p>
    <p>{totalItems} items</p>
  </div>
  <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
  <div className="mt-6">
    <div
      onClick={handleOrder}
      className="flex items-center cursor-pointer justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
    >
      Order Now
    </div>
  </div>
  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
    <p>
      or
      <Link to="/">
      <button
        type="button"
        className="font-medium text-indigo-600 hover:text-indigo-500"
        onClick={() => setOpen(false)}
      >
        Continue Shopping
        <span aria-hidden="true"> &rarr;</span>
      </button>
      </Link>
    </p>
  </div>
</div>
</div>
    </div>
    </div>
    </div>
    </>
  )
}
