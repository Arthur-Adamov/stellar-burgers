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
    },
    moveUp: (state, action) => {
      if (action.payload > 0) {
        state.otherIngredients.splice(
          action.payload,
          0,
          state.otherIngredients.splice(action.payload - 1, 1)[0]
        );
      }
    },
    moveDown: (state, action) => {
      if (action.payload < state.otherIngredients.length) {
        state.otherIngredients.splice(
          action.payload,
          0,
          state.otherIngredients.splice(action.payload + 1, 1)[0]
        );
      }
    },
    clearBurgerConstructor: (state) => {
      state.bun = null;
      state.otherIngredients = [];
    }
  },
  selectors: {
    getBun: (state) => state.bun,
    getOtherIngredients: (state) => state.otherIngredients
  }
});

export const constructorReducer = constructorSlice.reducer;
export const {
  addIngredient,
  deleteIngredient,
  moveUp,
  moveDown,
  clearBurgerConstructor
} = constructorSlice.actions;
export const { getBun, getOtherIngredients } = constructorSlice.selectors;
