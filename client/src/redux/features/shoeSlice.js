import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

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
      return response.data.shoe;
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

export const addCommentToShoeAsync = createAsyncThunk(
  'shoes/addCommentToShoeAsync',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userTokenAxios.post(
        `/${payload.shoeId}/comments`,
        { comment: payload.body }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const likeShoe = createAsyncThunk(
  'shoes/likeShoe',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userTokenAxios.post(`/${payload}/like`);
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
  initialState: {
    shoes: [],
    shoe: {},
  },
  reducers: {
    setShoes: (state, action) => {
      state.shoes = action.payload;
    },
    setShoe: (state, action) => {
      console.log(state.shoe);
      state.shoe = action.payload;
    },
  },
  extraReducers: {
    [getShoesAsync.fulfilled]: (state, action) => {
      state.shoes = action.payload;
    },
    [getOneShoeAsync.fulfilled]: (state, action) => {
      state.shoe = action.payload;
    },
    [createShoeAsync.fulfilled]: (state, action) => {
      state.shoes.push(action.payload);
    },
    [addCommentToShoeAsync.fulfilled]: (state, action) => {
      console.log(state.shoe.comments);
      state.shoe.comments.push(action.payload);
    },
    [likeShoe.fulfilled]: (state, action) => {
      const shoe = state.shoes.find((shoe) => shoe._id === action.payload._id);
      shoe.likes = action.payload.likes;
    },
    [updateShoeAsync.fulfilled]: (state, action) => {
      const index = state.shoes.findIndex(
        (shoe) => shoe.id === action.payload.id
      );
      state.shoes[index] = action.payload;
    },
    [deleteShoeAsync.fulfilled]: (state, action) => {
      const index = state.shoes.findIndex(
        (shoe) => shoe._id === action.payload.data._id
      );
      state.shoes.splice(index, 1);
    },
  },
});

export const { setShoe } = shoeSlice.actions;

export default shoeSlice.reducer;
