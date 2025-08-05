// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser } from './authAPI';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials) => {
    const response = await loginUser(credentials);
    return response.data;  // { access, refresh }
  }
);

const initialState = {
  access:  localStorage.getItem('access'),
  refresh: localStorage.getItem('refresh'),
  status: 'idle',   // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.access = null;
      state.refresh = null;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status  = 'succeeded';
        state.access  = action.payload.access;
        state.refresh = action.payload.refresh;

        // persist!
        localStorage.setItem('access',  state.access);
        localStorage.setItem('refresh', state.refresh);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
