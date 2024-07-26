import {configureStore} from '@reduxjs/toolkit';
import {dishReducer} from './DishSlice.ts';

const store = configureStore({
  reducer: {
    dishes: dishReducer,
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;