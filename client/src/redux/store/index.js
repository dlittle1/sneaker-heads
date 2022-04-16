import { configureStore } from '@reduxjs/toolkit';
import currentUserReducer from '../features/currentUserSlice';
import shoeReducer from '../features/shoeSlice';

export default configureStore({
  reducer: {
    shoes: shoeReducer,
    currentUser: currentUserReducer,
  },
});
