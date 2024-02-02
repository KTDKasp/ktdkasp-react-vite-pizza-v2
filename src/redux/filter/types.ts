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