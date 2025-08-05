// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import projectReducer from '../features/project/projectSlice';
import supportReducer from '../features/support/supportSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    project: projectReducer,
    support: supportReducer,
  },
});
