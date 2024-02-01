import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getCartFromLS } from '../../utils/getCartFromLS';

export type CartItem = {
		id: number,
		title: string,
		price: number,
		imageUrl: string,
		type: string,
		size: number,
		count: number,
}

interface ICartSliceState {
	totalPrice: number,
	items: CartItem[],
}

const {totalPrice, items} = getCartFromLS();

const initialState: ICartSliceState = {
	totalPrice: totalPrice,
	items: items,
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {

		addItem: (state, action: PayloadAction<CartItem>) => {
			const findItem = state.items.find((obj) => obj.id === action.payload.id);
			
			if (findItem) {
				findItem.count += 1;
			} 
			else {
				state.items.push({
					...action.payload,
					count: 1,
				});
			}

			state.totalPrice = state.items.reduce((sum, obj) => (obj.price * obj.count) + sum, 0);
		},
		minusItem(state, action: PayloadAction<number>) {
			const findItem = state.items.find((obj) => obj.id === action.payload);

			if (findItem) {
				findItem.count -= 1;
			}

			state.totalPrice = state.items.reduce((sum, obj) => (obj.price * obj.count) + sum, 0);
		},
		removeItem: (state, action: PayloadAction<number>) => {
			state.items = state.items.filter((obj) => action.payload !== obj.id);
			state.totalPrice = state.items.reduce((sum, obj) => (obj.price * obj.count) + sum, 0);
		},
		clearItems(state) {
			state.items = [];
			state.totalPrice = 0;
		},
	},
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: number, state: RootState) => state.cart.items.find(obj => obj.id === id);

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
