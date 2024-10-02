import { createSlice, AsyncThunkAction } from '@reduxjs/toolkit';
import { TIngredient } from '../../utils/types';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';

export const getIngredients = createAsyncThunk(
  'ingredient/get',
  getIngredientsApi
);

const initialState = {
  ingredients: [] as TIngredient[],
  loading: false,
  error: null as string | null
};

export const burgerIngredientsSlice = createSlice({
  name: 'burgerIngredients',
  initialState,
  selectors: {
    getIngredientState: (state) => state
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.ingredients = action.payload;
      });
  }
});

export const { getIngredientState } = burgerIngredientsSlice.selectors;

export default burgerIngredientsSlice.reducer;
