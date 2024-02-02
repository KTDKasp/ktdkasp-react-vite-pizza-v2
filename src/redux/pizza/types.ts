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

export interface IPizzaSliceState {
  status: Status;
  items: PizzaItem[];
}

export type SearchPizzaParams = {
  categoryId: number;
  sortProperty: string;
  currentPage: number;
  searchValue: string
};