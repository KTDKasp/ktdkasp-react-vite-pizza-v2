import { Routes, Route } from 'react-router-dom';
import React, { Suspense } from 'react';
import { Home } from './pages/Home';
import { MainLayout } from './layout/MainLayout';

import './scss/app.scss';

const Cart = React.lazy(() => import('./pages/Cart'));
const FullPizza = React.lazy(() => import('./pages/FullPizza'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
	return (
		<Routes>
			<Route path="/" element={<MainLayout />}>
				<Route index element={<Home />} />
				<Route
					path="cart"
					element={
						<Suspense fallback={<div>Loading ...</div>}>
							<Cart />
						</Suspense>
					}
				/>
				<Route
					path="pizza/:id"
					element={
						<Suspense fallback={<div>Loading ...</div>}>
							<FullPizza />
						</Suspense>
					}
				/>
				<Route
					path="*"
					element={
						<Suspense fallback={<div>Loading ...</div>}>
							<NotFound />
						</Suspense>
					}
				/>
			</Route>
		</Routes>
	);
}

// Экспорт основного приложения в main
export default App;
