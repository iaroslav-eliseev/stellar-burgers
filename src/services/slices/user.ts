import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserApi,
  TLoginData,
  loginUserApi,
  registerUserApi,
  TRegisterData,
  logoutApi,
  updateUserApi,
  getOrdersApi
} from '../../utils/burger-api';
import { TOrder, TUser } from '../../utils/types';
import { deleteCookie } from '../../utils/cookie';
import { setCookie } from '../../utils/cookie';

export const getUser = createAsyncThunk('user/get', async () => getUserApi());
export const getOrders = createAsyncThunk('user/getOrders', async () =>
  getOrdersApi()
);
export const update = createAsyncThunk('user/update', async (data: TUser) => {
  const res = await updateUserApi(data);
  if (!res.success) {
    return res;
  }
  return res;
});
export const logout = createAsyncThunk('user/logout', async () => {
  const res = await logoutApi();
  if (!res.success) {
    return res;
  }
  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');
  return res;
});
export const login = createAsyncThunk(
  'user/login',
  async (values: TLoginData) => {
    const res = await loginUserApi(values);
    if (!res.success) {
      return res;
    }
    localStorage.setItem('refreshToken', res.refreshToken);
    setCookie('accessToken', res.accessToken);
    return res;
  }
);

export const register = createAsyncThunk(
  'user/regUser',
  async (registerData: TRegisterData) => {
    const res = await registerUserApi(registerData);
    if (!res.success) {
      return res;
    }
    return res;
  }
);

export const initialState = {
  user: null as TUser | null,
  loading: false,
  error: null as string | null,
  userOrders: [] as TOrder[]
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    getUserState: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(register.pending, (state) => {
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.error.message as string;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.error = null;
      })
      .addCase(login.pending, (state) => {
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message as string;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.error = null;
        state.user = action.payload.user;
      })
      .addCase(logout.pending, (state) => {
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.error.message as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.error = null;
      })
      .addCase(update.pending, (state) => {
        state.error = null;
      })
      .addCase(update.rejected, (state, action) => {
        state.error = action.error.message as string;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.error = null;
        state.user = action.payload.user;
      })
      .addCase(getOrders.pending, (state) => {
        state.error = null;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.error = action.error.message as string;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.error = null;
        state.userOrders = action.payload;
      });
  }
});

export default userSlice.reducer;
export const { getUserState } = userSlice.selectors;

export type TUserState = typeof initialState;
