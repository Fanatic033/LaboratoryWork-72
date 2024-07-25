import {createSlice} from '@reduxjs/toolkit';

export interface oneDish {
  id: string;
  title: string;
  price: number;
  image: string;
}

export interface DishState {
  dishes: oneDish[];
  isLoading: boolean;
}

export const initialState: DishState = {
  dishes: [],
  isLoading: false,
};
const dishSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {},
});

export const dishReducer = dishSlice.reducer;