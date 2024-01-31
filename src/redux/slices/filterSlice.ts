import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type SortType = {
	name: string;
	sortProperty: 'rating' | 'price' | 'title' | '-rating' | '-price' | '-title';
}

export interface IFilterSliceState {
	searchValue: string,
	categoryId: number,
	currentPage: number,
	sort: SortType
}

const initialState: IFilterSliceState = {
	searchValue: '',
	categoryId: 0,
	currentPage: 1,
	sort: {
		name: 'популярности (ASC)',
		sortProperty: 'rating',
	},
};

const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setSearchValue: (state, action: PayloadAction<string>) => {
			state.searchValue = action.payload;
		},
		setCategoryId: (state, action: PayloadAction<number>) => {
			state.categoryId = action.payload;
		},
		setSortType: (state, action: PayloadAction<SortType>) => {
			state.sort.name = action.payload.name;
			state.sort.sortProperty = action.payload.sortProperty;
		},
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload;
		},
		setFilters: (state, action: PayloadAction<IFilterSliceState>) => {
			state.sort = action.payload.sort;
			state.categoryId = Number(action.payload.categoryId);
			state.currentPage = Number(action.payload.currentPage);
		},
	},
});

export const selectFilter = (state: RootState) => state.filter; 

export const { setCategoryId, setSortType, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;