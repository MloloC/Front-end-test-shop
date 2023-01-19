import { useEffect, useState } from 'react';
import { redirect, useParams } from 'react-router-dom';

const Product = () => {
	const params = useParams();

	const [product, setProduct] = useState([]);
	console.log(params, '<= QUII');
	const getProducts = async () => {
		if (!params.product) return;

		const response = await fetch(
			`https://2gm2eu9uuw.us-east-1.awsapprunner.com/api/product/${params.product}`
		);
		const data = await response.json();

		if (data) {
			setProduct(data);
		} else {
			console.log('Hubo un error');
			redirect('/');
		}
	};

	useEffect(() => {
		getProducts();
	}, [params.product]);

	console.log(product, '<= PRODUCTO');

	return (
		<>
			<h2>Desde producto wola</h2>
			<h3>{product.model}</h3>
		</>
	);
};

export default Product;
