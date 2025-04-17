import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

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
    user: JSON.parse(localStorage.getItem('user')) || null,
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    status: 'idle', // chưa làm gì
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      });
  },
});

export default authSlice.reducer;