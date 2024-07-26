import {configureStore} from '@reduxjs/toolkit';
import {dishReducer} from './DishSlice.ts';
import {clientReducer} from './ClientSlice.ts';

const store = configureStore({
  reducer: {
    dishes: dishReducer,
    client: clientReducer,
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;