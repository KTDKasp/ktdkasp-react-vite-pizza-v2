import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async ({ categoryId, sortType, currentPage, searchValue }) => {
    const { data } = await axios.get(
      `https://7f678c67a9e8e4e6.mokky.dev/items?page=${currentPage}&limit=4${
        categoryId > 0 ? `&category=${categoryId}` : ''
      }&sortBy=${sortType.sortProperty}${
        searchValue ? `&title=*${searchValue}*` : ''
      }`
    );
    return data;
  }
);

const initialState = {
  items: [],
	status: 'loading', // loading | success | failed
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
	extraReducers: (builder) => {
		builder.addCase(fetchPizzas.pending, (state) => {
			state.status = 'loading';
			state.items = [];
		})
		.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.items = action.payload.items;
			state.status = 'success';
		})
		.addCase(fetchPizzas.rejected, (state) => {
			state.status = 'failed';
			state.items = [];
		});
	},
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
