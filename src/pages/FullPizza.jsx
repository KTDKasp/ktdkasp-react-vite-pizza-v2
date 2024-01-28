import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';

export const FullPizza = () => {
	const { id } = useParams();
	const [pizza, setPizza] = React.useState({});

	React.useEffect(() => {
		const fetchPizzaData = async () => {
			try {
				const { data } = await axios.get("https://7f678c67a9e8e4e6.mokky.dev/items/" + id);
				setPizza(data);
			} catch (error) {
				console.log(`Hey, you have ${error}`);
			}
		}
		fetchPizzaData();
	}, [])

	if (!pizza) {
		return (<h2>Loading...</h2>);
	}

	return (
		<div className='container'>
			<img src={pizza.imageUrl} alt="name" />
			<h2>{pizza.title}</h2>
			<h4>{pizza.price} ₽</h4>
		</div>
	);
};
