import { getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getUserOrdersSelector } from '../ordersSlice/ordersSlice';

type TUserOrderState = {
  order: TOrder | null;
  orders: TOrder[];
  isLoading: boolean;
  error: string | undefined;
  orderRequest: boolean;
};

export const initialState: TUserOrderState = {
  order: null,
  orders: [],
  isLoading: false,
  error: undefined,
  orderRequest: false
};

export const sendUserOrder = createAsyncThunk(
  'order/sendUserOrder',
  async (data: string[]) => orderBurgerApi(data)
);

export const userOrderSlice = createSlice({
  name: 'userOrder',
  initialState,
  reducers: {},
  selectors: {
    userOrderSelector: (state) => state.order,
    userOrdersSelector: (state) => state.orders,
    orderRequestSelector: (state) => state.orderRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendUserOrder.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
        state.orderRequest = true;
      })
      .addCase(sendUserOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message;
        state.orderRequest = false;
      })
      .addCase(sendUserOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload.order;
        state.orderRequest = false;
      });
  }
});

export const userOrderReducer = userOrderSlice.reducer;
export const { userOrderSelector, userOrdersSelector, orderRequestSelector } =
  userOrderSlice.selectors;
