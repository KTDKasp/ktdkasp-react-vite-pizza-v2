import React from 'react';

type CategoriesProps = {
	value: number,
	onClickCategory: (i: number) => void,
};

const categoriesList = [
	'Все',
	'Мясные',
	'Вегетарианская',
	'Гриль',
	'Острые',
	'Закрытые',
];

export const Categories: React.FC<CategoriesProps> = React.memo(({ value, onClickCategory }) => {

	return (
		<div className="categories">
			<ul>
				{categoriesList.map((categoryName, index) => (
					<li
						key={index}
						onClick={() => onClickCategory(index)}
						className={value === index ? 'active' : ''}
					>
						{categoryName}
					</li>
				))}
			</ul>
		</div>
	);
});
