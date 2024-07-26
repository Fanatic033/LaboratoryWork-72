import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosApi from '../axiosApi.ts';
import { Dish } from '../types.ts';
import { RootState } from './store.ts';

export interface ClientState {
  dishes: Dish[];
  cart: { [id: string]: number };
  isFetching: boolean;
}
export interface Order {
  cart: { [id: string]: number };
  totalPrice: number;
}
export const initialState: ClientState = {
  dishes: [],
  cart: {},
  isFetching: false,
};

export const fetchDishesForClient = createAsyncThunk<Dish[], void, { state: RootState }>(
  'client/fetchDishes',
  async () => {
    const { data } = await axiosApi.get('/dishes.json');
    if (data === null) return [];
    return Object.keys(data).map((id) => ({ ...data[id], id }));
  }
);

export const submitOrder = createAsyncThunk<void, Order, { state: RootState }>(
  'client/submitOrder',
  async (order) => {
    await axiosApi.post('/orders.json', order);
  }
);

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.cart[id] = (state.cart[id] || 0) + 1;
    },
    clearCart: (state) => {
      state.cart = {};
    },
    updateCart: (state, action: PayloadAction<{ [id: string]: number }>) => {
      state.cart = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDishesForClient.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchDishesForClient.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.dishes = payload;
      })
      .addCase(fetchDishesForClient.rejected, (state) => {
        state.isFetching = false;
      });
  },
});

export const { addToCart, clearCart, updateCart } = clientSlice.actions;
export const clientReducer = clientSlice.reducer;
export const selectDishesForClient = (state: RootState) => state.client.dishes;
export const selectCart = (state: RootState) => state.client.cart;
export const selectIsFetchingForClient = (state: RootState) => state.client.isFetching;
