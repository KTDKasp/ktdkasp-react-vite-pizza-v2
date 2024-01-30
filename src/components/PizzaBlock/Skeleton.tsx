import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = () => (
	<ContentLoader
		className='pizza-block'
		speed={2}
		width={280}
		height={500}
		viewBox="0 0 280 470"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
	>
		<circle cx="138" cy="127" r="127" />
		<rect x="0" y="275" rx="10" ry="10" width="280" height="25" />
		<rect x="0" y="318" rx="10" ry="10" width="280" height="90" />
		<rect x="125" y="424" rx="25" ry="25" width="155" height="45" />
		<rect x="0" y="434" rx="10" ry="10" width="91" height="27" />
	</ContentLoader>
);

export default Skeleton;
