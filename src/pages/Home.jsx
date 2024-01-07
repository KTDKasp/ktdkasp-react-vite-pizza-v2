import React from 'react';

import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

export const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState(0);

  React.useEffect(() => {
		setIsLoading(true)
    fetch('https://7f678c67a9e8e4e6.mokky.dev/items?category=' + categoryId)
      .then(res => res.json())
      .then(data => setItems(data))
      .finally(() => setIsLoading(false));
		window.scrollTo(0, 0);
  }, [categoryId, sortType]);

	return (
		<div className='container'>
			<div className="content__top">
				<Categories value={categoryId} onClickCategory={(i) => setCategoryId(i)} />
				<Sort value={sortType} onChangeSort={(i) => setSortType(i)} />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{isLoading
					? [...new Array(6)].map((_, index) => (
							<Skeleton key={index} />
					  ))
					: items.map((obj) => (
							<PizzaBlock
								key={obj.id}
								imageUrl={obj.imageUrl}
								title={obj.title}
								price={obj.price}
								sizes={obj.sizes}
								types={obj.types}
							/>
					  ))}
			</div>
		</div>
	);
};
