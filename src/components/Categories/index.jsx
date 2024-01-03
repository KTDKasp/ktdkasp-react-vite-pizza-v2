import React from 'react';

export function Categories() {

	const [activeIndex, setActiveIndex] = React.useState(0);

	const categoriesList = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

	const onClickCategory = (index) => {
		setActiveIndex(index);
	};

	return (
		<div className="categories">
			<ul>
				{
					categoriesList.map((category, index) => (
						<li key={index} onClick={() => onClickCategory(index)} className={activeIndex === index ? 'active' : ''}>
							{category}
						</li>
					))
				}
			</ul>
		</div>
	);
}
