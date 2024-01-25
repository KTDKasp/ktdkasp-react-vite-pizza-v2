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
import QueryString from 'qs';

export const Home = () => {
	const { searchValue } = React.useContext(SearchContext);
	const [items, setItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const isSearch = React.useRef(false);
	const isMounted = React.useRef(false);

	const [pageMetaData, setPageMetaData] = React.useState({});

	const categoryId = useSelector((state) => state.filter.categoryId);
	const sortType = useSelector((state) => state.filter.sort);
	const currentPage = useSelector((state) => state.filter.currentPage);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const fetchPizzas = () => {
		setIsLoading(true);
		axios.get(
			`https://7f678c67a9e8e4e6.mokky.dev/items?page=${currentPage}&limit=4${
				categoryId > 0 ? `&category=${categoryId}` : ''
			}&sortBy=${sortType.sortProperty}${
				searchValue ? `&title=*${searchValue}*` : ''
			}`
		)
		.then(res => {
			setItems(res.data.items);
			setPageMetaData(res.data.meta);
		})
		.finally(() => setIsLoading(false))
	};

	// Если изменили параметры и был первый рендер, то закрепляем параметры в URL
	React.useEffect(() => {
		if (isMounted.current) {
			const queryString = QueryString.stringify({
				sortProperty: sortType.sortProperty,
				categoryId,
				currentPage,
			});

			navigate(`?${queryString}`)
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
			fetchPizzas();
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
			<div className="content__items">
				{isLoading
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
					  ))}
			</div>
			<Pagination currentPage={currentPage} onChangePage={(number) => dispatch(setCurrentPage(number))} />
		</div>
	);
};
