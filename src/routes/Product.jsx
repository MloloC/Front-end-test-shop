import { useEffect, useState } from 'react';
import { redirect, useParams } from 'react-router-dom';

const Product = () => {
	const { productId } = useParams();
	const [product, setProduct] = useState([]);

	const getProducts = async () => {
		if (!productId) return;

		const response = await fetch(
			`https://2gm2eu9uuw.us-east-1.awsapprunner.com/api/product/${productId}`
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
	}, [productId]);

	console.log(product, '<= PRODUCTO');

	return (
		<>
			<h2>Desde producto wola</h2>
			<h3>{product.model}</h3>
		</>
	);
};

export default Product;
