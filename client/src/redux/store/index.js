import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import shoeReducer from '../features/shoeSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    shoes: shoeReducer,
  },
});
