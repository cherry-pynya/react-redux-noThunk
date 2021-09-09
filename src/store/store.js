import { configureStore } from '@reduxjs/toolkit';
import listSlice from '../reducer/listSlice';

export default configureStore({
  reducer: {
    list: listSlice,
  },
})
