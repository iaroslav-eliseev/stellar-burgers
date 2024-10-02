import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrderByNumberApi, getFeedsApi } from '../../utils/burger-api';

export const initialState = {
  orders: [] as TOrder[],
  orderByNumberResponse: null as TOrder | null,
  request: false,
  error: null as string | null
};

export const getOrderByNumber = createAsyncThunk(
  'order/byNumber',
  async (number: number) => await getOrderByNumberApi(number)
);

export const getOrders = createAsyncThunk('order/get', async () => {
  const response = await getFeedsApi();
  return response.orders;
});

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    getOrderState: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.request = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.request = false;
        state.error = null;
        state.orderByNumberResponse = action.payload.orders[0];
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.request = false;
        state.error = action.error.message as string;
      })
      .addCase(getOrders.pending, (state) => {
        state.request = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.request = false;
        state.error = null;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.request = false;
        state.error = action.error.message as string;
      });
  }
});

export const { getOrderState } = orderSlice.selectors;
export default orderSlice.reducer;
