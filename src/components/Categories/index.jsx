import React from 'react';

export function Categories({ value, onClickCategory }) {
	const categoriesList = [
		'Все',
		'Мясные',
		'Вегетарианская',
		'Гриль',
		'Острые',
		'Закрытые',
	];

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
}
