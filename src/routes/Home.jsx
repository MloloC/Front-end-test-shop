import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
	const [products, setProducts] = useState([]);

	const getProducts = async () => {
		const response = await fetch(
			'https://2gm2eu9uuw.us-east-1.awsapprunner.com/api/product'
		);
		const data = await response.json();

		if (data && data.length > 0) {
			setProducts(data);
		} else {
			console.log('Hubo un error');
		}
	};

	useEffect(() => {
		getProducts();
	}, []);

	return (
		<section>
			{products?.map(product => {
				return (
					<Link to={`/${product.id}`} key={product.id}>
						<h1>{product.model}</h1>
					</Link>
				);
			})}
		</section>
	);
};

export default Home;
