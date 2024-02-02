import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import filterReducer from '../redux/filter/slice'
import cartReducer from '../redux/cart/slice';
import pizzaReducer from '../redux/pizza/slice';


export const store = configureStore({
	reducer: {
		filter: filterReducer,
		cart: cartReducer,
		pizza: pizzaReducer,
	}
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); 

