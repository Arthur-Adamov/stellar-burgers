import { configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from './slices/ingredientSlice/ingredientSlice';
import { constructorReducer } from './slices/constructorSlice/constructorSlice';
import { userOrderReducer } from './slices/userOrdersSlice/userOrdersSlice';
import { userReducer } from './slices/userSlice/userSlice';
import { ordersReducer } from './slices/ordersSlice/ordersSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  userOrder: userOrderReducer,
  user: userReducer,
  orders: ordersReducer
}); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
