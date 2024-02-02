import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { CartItem, ICartSliceState } from "./types";

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



export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
