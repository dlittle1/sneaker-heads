import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const token = localStorage.getItem('token');
const initState = { shoes: [] };
console.log(token);
let userTokenAxios = axios.create({
  baseURL: '/api/shoes',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

userTokenAxios.interceptors.response.use((response) => {
  if (response.data.errorMessage === 'jwt expired') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
    return Promise.reject({
      message: 'Your session has expired. Please log in again.',
      response,
    });
  }
  return response;
});

export const getShoesAsync = createAsyncThunk(
  'shoes/getShoesAsync',
  async (payload, { rejectWithValue }) => {
    try {
      console.log(userTokenAxios.defaults.headers);
      const response = await userTokenAxios.get(`?sortby=${payload}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getOneShoeAsync = createAsyncThunk(
  'shoes/getOneShoeAsync',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userTokenAxios.get(`/${payload}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createShoeAsync = createAsyncThunk(
  'shoes/createShoeAsync',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userTokenAxios.post('/', payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateShoeAsync = createAsyncThunk(
  'shoes/updateShoeAsync',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userTokenAxios.put(`/${payload.id}`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteShoeAsync = createAsyncThunk(
  'shoes/deleteShoeAsync',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userTokenAxios.delete(`/${payload}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const shoeSlice = createSlice({
  name: 'shoes',
  initialState: initState,
  reducers: {
    setShoes: (state, action) => {
      state.shoes = action.payload;
    },
  },
  extraReducers: {
    [getShoesAsync.fulfilled]: (state, action) => {
      state.shoes = action.payload;
    },
    [getOneShoeAsync.fulfilled]: (state, action) => {
      state.shoes = action.payload;
    },
    [createShoeAsync.fulfilled]: (state, action) => {
      state.shoes.push(action.payload);
    },
    [updateShoeAsync.fulfilled]: (state, action) => {
      const index = state.shoes.findIndex(
        (shoe) => shoe.id === action.payload.id
      );
      state.shoes[index] = action.payload;
    },
    [deleteShoeAsync.fulfilled]: (state, action) => {
      console.log(action.payload.data._id);
      const index = state.shoes.findIndex(
        (shoe) => shoe._id === action.payload.data._id
      );
      state.shoes.splice(index, 1);
    },
  },
});

export default shoeSlice.reducer;
