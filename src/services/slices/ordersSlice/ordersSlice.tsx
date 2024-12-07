import { getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TUserOrdersState = {
  order: TOrder | null;
  orders: TOrder[];
  isLoading: boolean;
  error: string | null | unknown;
  orderRequest: boolean;
};

export const initialState: TUserOrdersState = {
  order: null,
  orders: [],
  isLoading: false,
  error: null,
  orderRequest: false
};

export const getUserOrders = createAsyncThunk('order/getUserOrders', async () =>
  getOrdersApi()
);

export const userOrderSlice = createSlice({
  name: 'userOrder',
  initialState,
  reducers: {},
  selectors: {
    getUserOrdersSelector: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrders.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.error = action.error?.message;
        state.isLoading = false;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      });
  }
});

export const userOrderReducer = userOrderSlice.reducer;
export const { getUserOrdersSelector } = userOrderSlice.selectors;
