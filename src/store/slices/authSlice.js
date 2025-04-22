import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';
import { decodeJwt } from '../../utils/jwt';

export const login = createAsyncThunk('Auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await api.post('/Auth/login', credentials);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response.data.errors);
  }
});

export const register = createAsyncThunk('Auth/register', async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/Auth/register', credentials);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
});

export const logout = createAsyncThunk('Auth/logout', async (_, { rejectWithValue }) => {
  try {
    await api.post('/Auth/logout');
    return true;
  } catch (error) {
    return rejectWithValue(error.response.data.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    role: localStorage.getItem('accessToken') ? decodeJwt(localStorage.getItem('accessToken'))?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || null : null,
    fullName: localStorage.getItem('accessToken') ? decodeJwt(localStorage.getItem('accessToken'))?.fullName || null : null,
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    status: 'idle', // chưa làm gì
    error: null,
    isSidebarOpen: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.role = decodeJwt(action.payload.accessToken)?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || null;
        state.fullName = decodeJwt(action.payload.accessToken)?.fullName || null;
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.role = null;
        state.accessToken = null;
        state.refreshToken = null;
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      });
  },
  toggleSidebar: (state) => {
    state.isSidebarOpen = !state.isSidebarOpen;
  },
});
export const { toggleSidebar } = authSlice.actions;
export default authSlice.reducer;