import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { orderBurgerApi } from '../../utils/burger-api';

export const initialState = {
  constructorItems: {
    bun: null as TConstructorIngredient | null,
    ingredients: [] as TConstructorIngredient[]
  },
  orderRequest: false,
  orderModalData: null as TOrder | null,
  loading: false,
  error: null as string | null
};

export const orderBurger = createAsyncThunk('user/order', orderBurgerApi);

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  selectors: {
    constructorItemsState: (state) => state.constructorItems,
    orderModalState: (state) => state.orderModalData,
    orderRequestState: (state) => state.orderRequest
  },
  reducers: {
    addBun: (state, action) => {
      state.constructorItems.bun = action.payload;
    },
    addIngredient: (state, action) => {
      state.constructorItems.ingredients.push(action.payload);
    },
    removeIngredient: (state, action) => {
      const index = state.constructorItems.ingredients.findIndex(
        (i) => i._id === action.payload
      );
      state.constructorItems.ingredients.splice(index, 1);
    },
    clearConstructor: (state) => {
      state.constructorItems = {
        bun: null,
        ingredients: []
      };
      state.orderModalData = null;
    },
    moveUp: (state, action) => {
      const index = state.constructorItems.ingredients.findIndex(
        (i) => i._id === action.payload
      );
      if (index > 0) {
        const ingredient = state.constructorItems.ingredients[index];
        state.constructorItems.ingredients[index] =
          state.constructorItems.ingredients[index - 1];
        state.constructorItems.ingredients[index - 1] = ingredient;
      }
    },
    moveDown: (state, action) => {
      const index = state.constructorItems.ingredients.findIndex(
        (i) => i._id === action.payload
      );
      if (index < state.constructorItems.ingredients.length - 1) {
        const ingredient = state.constructorItems.ingredients[index];
        state.constructorItems.ingredients[index] =
          state.constructorItems.ingredients[index + 1];
        state.constructorItems.ingredients[index + 1] = ingredient;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message as string;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.error = null;
        state.orderModalData = action.payload.order;
      });
  }
});

export const { constructorItemsState, orderModalState, orderRequestState } =
  burgerConstructorSlice.selectors;
export const {
  addBun,
  addIngredient,
  removeIngredient,
  clearConstructor,
  moveUp,
  moveDown
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
