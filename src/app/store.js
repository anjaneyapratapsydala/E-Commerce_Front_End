import { configureStore,createReducer } from '@reduxjs/toolkit';
import productReducer from '../features/product-list/productSlice'
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/CartSlice'
import orderReducer from '../features/order/orderSlice'
export const store = configureStore({
  reducer: {
    product:productReducer,
    auth:authReducer,
    cart:cartReducer,
    order:orderReducer
  },
});
