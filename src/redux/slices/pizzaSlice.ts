import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IFilterSliceState } from './filterSlice';

export type PizzaItem = {
  id: number, 
  imageUrl: string, 
  title: string, 
  price: number, 
  sizes: number[], 
  types: number[],
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'failed',
}

interface IPizzaSliceState {
  status: Status;
  items: PizzaItem[];
}

export type SearchPizzaParams = {
  categoryId: number;
  sortProperty: string;
  currentPage: number;
  searchValue: string
};


export const fetchPizzas = createAsyncThunk<PizzaItem[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async ({ categoryId, sortProperty, currentPage, searchValue }) => {
    const { data } = await axios.get(
      `https://7f678c67a9e8e4e6.mokky.dev/items?page=${currentPage}&limit=4${
        categoryId > 0 ? `&category=${categoryId}` : ''
      }&sortBy=${sortProperty}${
        searchValue ? `&title=*${searchValue}*` : ''
      }`
    );
    
    return data.items;
  }
);


const initialState: IPizzaSliceState = {
  items: [],
	status: Status.LOADING, // loading | success | failed
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<PizzaItem[]>) => {
      state.items = action.payload;
    },
  },
	extraReducers: (builder) => {
		builder.addCase(fetchPizzas.pending, (state) => {
			state.status = Status.LOADING;
			state.items = [];
		})
		.addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<PizzaItem[]>) => {
			state.items = action.payload;
			state.status = Status.SUCCESS;
		})
		.addCase(fetchPizzas.rejected, (state) => {
			state.status = Status.ERROR;
			state.items = [];
		});
	},
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
