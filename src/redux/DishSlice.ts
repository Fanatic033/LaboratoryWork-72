import {createSlice} from '@reduxjs/toolkit';
import {addDish} from './DishThunks.ts';


export interface DishState {
  isLoading: boolean;
}

export const initialState: DishState = {
  isLoading: false,
};


const dishSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addDish.pending,(state) =>{
        state.isLoading = true
      }).addCase(addDish.fulfilled,(state) => {
        state.isLoading = false
    }).addCase(addDish.rejected,(state) => {
      state.isLoading = false
    })
  },
  selectors:{
    selectDishIsCreating: (state) => state.isLoading
  }
});

export const dishReducer = dishSlice.reducer;

export const  {selectDishIsCreating} = dishSlice.selectors;
