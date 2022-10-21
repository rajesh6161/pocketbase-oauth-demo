import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from './authService';
import { toast } from 'react-toastify';

const initialState = {
  user: null,
  loading: false,
  error: null,
  loggedIn: false,
  authProviders: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      authService.logout();
      state.user = null;
      state.loggedIn = false;
    },
    setUserLoggedIn: (state) => {
      let pocketbase_auth = localStorage.getItem('pocketbase_auth');
      pocketbase_auth = JSON.parse(pocketbase_auth);
      if (pocketbase_auth?.token?.length > 0) {
        state.user = pocketbase_auth.model;
        state.loading = false;
        state.error = null;
        state.loggedIn = true;
      }
    },
  },
  extraReducers: {},
});

export const { logout, setUserLoggedIn } = authSlice.actions;

export default authSlice.reducer;
