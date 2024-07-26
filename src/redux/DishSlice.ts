import {createSlice} from '@reduxjs/toolkit';
import {addDish, fetchDishes} from './DishThunks.ts';
import {Dish} from '../types.ts';


export interface DishState {
  dishes: Dish[];
  isFetching: boolean;
  isLoading: boolean;
}

export const initialState: DishState = {
  dishes: [],
  isFetching: false,
  isLoading: false,
};


const dishSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addDish.pending, (state) => {
        state.isLoading = true;
      }).addCase(addDish.fulfilled, (state) => {
      state.isLoading = false;
    }).addCase(addDish.rejected, (state) => {
      state.isLoading = false;
    });
    builder
      .addCase(fetchDishes.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchDishes.fulfilled, (state, {payload: items}) => {
        state.isFetching = false;
        state.dishes = items;
      })
      .addCase(fetchDishes.rejected, (state) => {
        state.isFetching = false;
      });
  },
  selectors: {
    selectDishIsCreating: (state) => state.isLoading,
    selectDishes: (state) => state.dishes,
    selectDishIsFetching: (state) => state.isFetching,
  }
});

export const dishReducer = dishSlice.reducer;

export const {
  selectDishIsCreating,
  selectDishes,
  selectDishIsFetching
} = dishSlice.selectors;
