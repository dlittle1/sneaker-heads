import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import defaultAxios from 'axios';

const setAxiosHeaders = () => {
  const token = localStorage.getItem('token');
  let axios = defaultAxios.create({
    baseURL: '/api/shoes',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  axios.interceptors.response.use((response) => {
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

  return axios;
};

const useAxios = async (method, url, data) => {
  try {
    const axios = setAxiosHeaders();
    const response = await axios[method](url, data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getShoesAsync = createAsyncThunk(
  'shoes/getShoesAsync',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await useAxios('get', `?sort=${payload}`);
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
      const response = await useAxios('get', `/${payload}`);
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
      const response = await useAxios('post', '', payload);
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
      const response = await useAxios('post', `/${payload.shoeId}/comments`, {
        comment: payload.body,
      });
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
      const response = await useAxios('post', `/${payload}/like`);
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
      const response = await useAxios('put', `/${payload.id}`, payload);
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
      const response = await useAxios('delete', `/${payload}`);
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
    sort: 'numLikes',
  },
  reducers: {
    setShoes: (state, action) => {
      state.shoes = action.payload;
    },
    setShoe: (state, action) => {
      state.shoe = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
      state.shoes.sort((a, b) => {
        if (a[state.sort] < b[state.sort]) {
          return 1;
        }
        if (a[state.sort] > b[state.sort]) {
          return -1;
        }
        return 0;
      });
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
      state.shoe.comments.push(action.payload);
    },
    [likeShoe.fulfilled]: (state, action) => {
      if (state.shoe._id === action.payload._id) {
        state.shoe.likes = action.payload.likes;
        state.shoe.numLikes = action.payload.numLikes;
      }

      if (state.shoes.length > 0) {
        const shoe = state.shoes.find(
          (shoe) => shoe._id === action.payload._id
        );
        shoe.likes = action.payload.likes;
        shoe.numLikes = action.payload.numLikes;
      }
    },
    [updateShoeAsync.fulfilled]: (state, action) => {
      const index = state.shoes.findIndex(
        (shoe) => shoe._id === action.payload._id
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

export const { setShoe, setSort } = shoeSlice.actions;

export default shoeSlice.reducer;
