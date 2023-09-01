import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UpdateOrder, createOrder,fetchAllOrders} from './orderAPI';

const initialState = {
  orders:[],
  status: 'idle',
  currentOrder:null,
  totalOrders:[]
};

export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (order) => {
    const response = await createOrder(order);
    return response.data;
  }
);
export const updateOrderAsync = createAsyncThunk(
  'order/updateOrder',
  async (order) => {
    const response = await UpdateOrder(order);
    return response.data;
  }
);
export const fetchAllOrdersAsync = createAsyncThunk(
  'order/fetchAllOrders',
  async (pagination) => {
    const response = await fetchAllOrders(pagination);
  
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    resetOrder:(state) =>{
      state.currentOrder=null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
        state.currentOrder=action.payload;
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders= action.payload.orders
        state.totalOrders = action.payload.totalOrders
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.orders.findIndex(order=>order.id===action.payload.id)
        state.orders[index] = action.payload;
      });
  },
});

export const {resetOrder} = orderSlice.actions;

//selector for selecting part in a state
export const selectCurrentOrder = (state) => state.order.currentOrder ;
export const selectOrders = (state) => state.order.orders ;
export const selectTotalOrders = (state) => state.order.totalOrders ;

export default orderSlice.reducer;
