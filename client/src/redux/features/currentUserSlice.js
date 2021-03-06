import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialUser = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;

export const setUserAsync = createAsyncThunk(
  'user/setUserAsync',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post('/auth/login', payload);
      const { token, user } = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      return user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createUserAsync = createAsyncThunk(
  'user/createUserAsync',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post('/auth/signup', payload);
      const { token, user } = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      return user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: initialUser,
    isLoggedIn: !!initialUser,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = !!action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
  extraReducers: {
    [setUserAsync.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = !!action.payload;
    },
    [createUserAsync.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = !!action.payload;
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
