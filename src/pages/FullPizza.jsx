import React from 'react';
import { useParams } from 'react-router-dom';

export const FullPizza = () => {
	const params = useParams();

	console.log(params);
	return (
		<div className='container'>
			<img src="" alt="name" />
			<h2>Big Pizza</h2>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio esse
				optio nisi itaque dignissimos eaque provident enim consectetur id,
				obcaecati aliquid ipsum molestiae similique est tempore delectus qui
				asperiores autem.
			</p>
			<h4>250 ₽</h4>
		</div>
	);
};
