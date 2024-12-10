import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrdersState = {
  order: TOrder | null;
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null | unknown;
  orderRequest: boolean;
};

export const initialState: TOrdersState = {
  order: null,
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null,
  orderRequest: false
};

export const getOrders = createAsyncThunk('order/getOrders', getFeedsApi);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    getOrdersSelector: (state) => state.orders,
    getTotalSelector: (state) => state.total,
    getTotalTodaySelector: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.isLoading = false;
      });
  }
});

export const { getOrdersSelector, getTotalSelector, getTotalTodaySelector } =
  ordersSlice.selectors;
export const ordersReducer = ordersSlice.reducer;
