import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Categories } from '../components/Categories';
import { Sort, popupList } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { Pagination } from '../components/Pagination';
import { setCategoryId, setSortType, setCurrentPage, setFilters, selectFilter, SortType, IFilterSliceState } from '../redux/slices/filterSlice';
import { PizzaItem, SearchPizzaParams, fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';
import QueryString from 'qs';
import { useAppDispatch } from '../redux/store';

export const Home: React.FC = () => {
	const isSearch = React.useRef(false);
	const isMounted = React.useRef(false);

	const { items, status } = useSelector(selectPizzaData);
	const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const getPizzas = async () => {
		dispatch(
			fetchPizzas({
			categoryId,
			sortProperty: sort.sortProperty,
			currentPage,
			searchValue,
		}));
	};

	// Если изменили параметры и был первый рендер, то закрепляем параметры в URL
	React.useEffect(() => {
		if (isMounted.current) {
			const queryString = QueryString.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			});
			navigate(`?${queryString}`);
		}

		isMounted.current = true;
	}, [categoryId, sort.sortProperty, currentPage]);

	// Если был первый рендер, то проверяем URL-параметры и сохраняем в редаксе
	React.useEffect(() => {
		if (window.location.search) {
			const params: SearchPizzaParams = QueryString.parse(window.location.search.substring(1));
			const sort = popupList.find(obj => obj.sortProperty === params.sortProperty);
			
			dispatch(
				setFilters({
					searchValue: params.searchValue,
					categoryId: params.categoryId,
					currentPage: params.currentPage,
					sort: sort || popupList[0],
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
	}, [categoryId, sort, searchValue, currentPage]);

	return (
		<div className="container">
			<div className="content__top">
				<Categories
					value={categoryId}
					onClickCategory={(i: number) => dispatch(setCategoryId(i))}
				/>
				<Sort value={sort} onChangeSort={(i: SortType) => dispatch(setSortType(i))} />
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
							: items.map((obj: PizzaItem) => (
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
			<Pagination currentPage={currentPage} onChangePage={(page: number) => dispatch(setCurrentPage(page))} />
		</div>
	);
};
