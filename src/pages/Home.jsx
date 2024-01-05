import React from 'react';

import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

export const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('https://7f678c67a9e8e4e6.mokky.dev/items')
      .then(res => res.json())
      .then(data => setItems(data))
      .finally(() => setIsLoading(false));
		window.scrollTo(0, 0);
  }, []);

	return (
		<div className='container'>
			<div className="content__top">
				<Categories />
				<Sort />
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
