import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Categories } from '../components/Categories';
import { Sort, popupList } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { Pagination } from '../components/Pagination';
import { SearchContext } from '../App';
import { setCategoryId, setSortType, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';
import QueryString from 'qs';

export const Home = () => {
	const { searchValue } = React.useContext(SearchContext);
	const isSearch = React.useRef(false);
	const isMounted = React.useRef(false);

	const { items, status } = useSelector((state) => state.pizza);
	const categoryId = useSelector((state) => state.filter.categoryId);
	const sortType = useSelector((state) => state.filter.sort);
	const currentPage = useSelector((state) => state.filter.currentPage);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const getPizzas = async () => {
		dispatch(fetchPizzas({
			categoryId,
			sortType,
			currentPage,
			searchValue,
		}));
	};

	// Если изменили параметры и был первый рендер, то закрепляем параметры в URL
	React.useEffect(() => {
		if (isMounted.current) {
			const queryString = QueryString.stringify({
				sortProperty: sortType.sortProperty,
				categoryId,
				currentPage,
			});
			navigate(`?${queryString}`);
		}

		isMounted.current = true;
	}, [categoryId, sortType.sortProperty, currentPage]);

	// Если был первый рендер, то проверяем URL-параметры и сохраняем в редаксе
	React.useEffect(() => {
		if (window.location.search) {
			const params = QueryString.parse(window.location.search.substring(1));
			const sort = popupList.find(obj => obj.sortProperty === params.sortProperty);

			dispatch(
				setFilters({
					sort,
					...params,
				}),
			);
			isSearch.current = true;
		}
	}, []);

	// Если был первый рендер, то запрашиваем пиццы
	React.useEffect(() => {
		window.scrollTo(0, 0);
		
		if (!isSearch.current) {
			getPizzas();
		}

		isSearch.current = false;
	}, [categoryId, sortType, searchValue, currentPage]);

	return (
		<div className="container">
			<div className="content__top">
				<Categories
					value={categoryId}
					onClickCategory={(i) => dispatch(setCategoryId(i))}
				/>
				<Sort value={sortType} onChangeSort={(i) => dispatch(setSortType(i))} />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			{
				status === 'failed' ? (
					<div className='content__error-info'>
						<h2>Произошла ошибка 😕</h2>
						<p>К сожалению, не удалось загрузить пиццы. Попробуйте повторить попытку позже.</p>
					</div>
				) : (
					<div className="content__items">
						{ status === 'loading' 
							? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
							: items.map((obj) => (
									<PizzaBlock
										key={obj.id}
										id={obj.id}
										imageUrl={obj.imageUrl}
										title={obj.title}
										price={obj.price}
										sizes={obj.sizes}
										types={obj.types}
									/>
					  		)
							)
						}
					</div>
				)
			}
			<Pagination currentPage={currentPage} onChangePage={(number) => dispatch(setCurrentPage(number))} />
		</div>
	);
};
