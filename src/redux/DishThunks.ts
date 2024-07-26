import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../axiosApi.ts';
import {ApiDish} from '../types.ts';
import {RootState} from './store.ts';


export const addDish = createAsyncThunk<void, ApiDish, {state: RootState}>('dishes/addDish', async (newDish) => {
  const response = await axiosApi.post('/dishes.json', newDish);
  return response.data;
});
