import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	categoryId: 0,
	sort: {
		name: 'популярности (ASC)',
		sortProperty: 'rating',
	},
};

const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setCategoryId: (state, action) => {
			state.categoryId = action.payload;
		},
		setSortType: (state, action) => {
			state.sort.name = action.payload.name;
			state.sort.sortProperty = action.payload.sortProperty;
		},
	},
});

export const { setCategoryId, setSortType } = filterSlice.actions;

export default filterSlice.reducer;