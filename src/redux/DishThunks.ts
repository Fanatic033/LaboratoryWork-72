import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../axiosApi.ts';
import {ApiDish, ApiDishes, Dish} from '../types.ts';
import {RootState} from './store.ts';


export const addDish = createAsyncThunk<void, ApiDish, { state: RootState }>('dishes/addDish', async (newDish) => {
  const response = await axiosApi.post('/dishes.json', newDish);
  return response.data;
});


export const fetchDishes = createAsyncThunk<Dish[], void, { state: RootState }>('dishes/fetch',
  async () => {
    const {data: dish} = await axiosApi.get<null | ApiDishes>('/dishes.json');
    if (dish === null) {
      return [];
    }
    return Object.keys(dish).map((id) => ({
      id,
      ...dish[id]
    }));
  }
);


// export const editDish = createAsyncThunk('dishes/editDish', async (updatedDish: oneDish) => {
//   const response = await axiosApi.put(`/dishes/${updatedDish.id}`, updatedDish);
//   return response.data;
// });
//
// export const deleteDish = createAsyncThunk('dishes/deleteDish', async (dishId: string) => {
//   await axiosApi.delete(`/dishes/${dishId}`);
//   return dishId;
// });
