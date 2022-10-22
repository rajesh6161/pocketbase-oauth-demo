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

export const getoAuthProviders = createAsyncThunk(
  'auth/oAuthProviders',
  async (_, { rejectWithValue }) => {
    try {
      const authProviders = await authService.oAuthMethods();
      return authProviders;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      authService.logout();
      localStorage.removeItem('userData');
      state.user = null;
      state.loggedIn = false;
    },
    setUserLoggedIn: (state) => {
      let pocketbase_auth = localStorage.getItem('pocketbase_auth');
      pocketbase_auth = JSON.parse(pocketbase_auth);
      if (pocketbase_auth?.token?.length > 0) {
        state.loggedIn = true;
      }
      let user =
        localStorage.getItem('userData') !== null
          ? JSON.parse(localStorage.getItem('userData'))
          : null;
      state.user = user;
    },
  },
  extraReducers: {
    [getoAuthProviders.pending]: (state) => {
      state.loading = true;
    },
    [getoAuthProviders.fulfilled]: (state, action) => {
      state.loading = false;
      state.authProviders = action.payload;
    },
    [getoAuthProviders.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { logout, setUserLoggedIn } = authSlice.actions;

export default authSlice.reducer;
