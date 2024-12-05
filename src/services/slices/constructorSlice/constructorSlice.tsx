import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { getIngredientsSelector } from '../ingredientSlice/ingredientSlice';

type TConstructorState = {
  bun: TConstructorIngredient | null;
  otherIngredients: Array<TConstructorIngredient>;
};

const initialState: TConstructorState = {
  bun: null,
  otherIngredients: []
};

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.otherIngredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const key = nanoid();
        return { payload: { ...ingredient, id: key } };
      }
    },
    deleteIngredient: (state, action) => {
      state.otherIngredients = state.otherIngredients.filter(
        (i) => i.id !== action.payload.id
      );
    }
  },
  selectors: {
    getBun: (state) => state.bun,
    getOtherIngredients: (state) => state.otherIngredients
  }
});

export const constructorReducer = constructorSlice.reducer;
export const { addIngredient, deleteIngredient } = constructorSlice.actions;
export const { getBun, getOtherIngredients } = constructorSlice.selectors;
