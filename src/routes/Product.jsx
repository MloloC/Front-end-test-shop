import { useEffect, useState } from 'react';
import { redirect, useParams } from 'react-router-dom';
import CardDescription from '../components/CardDescription/CardDescription';
import Select from '../components/Select/Select';
import style from './Product.module.css';

const Product = () => {
	const [product, setProduct] = useState([]);
	const [memorySelected, setMemorySelected] = useState('');
	const [colorSelected, setColorSelected] = useState('');
	const { internalMemory, colors } = product;
	const params = useParams();

	const getProducts = async () => {
		if (!params.product) return;

		const response = await fetch(
			`https://2gm2eu9uuw.us-east-1.awsapprunner.com/api/product/${params.product}`
		);
		const data = await response.json();

		if (data) {
			setProduct(data);
			setMemorySelected(data.internalMemory[0]);
			setColorSelected(data.colors[0]);
		} else {
			console.log('Hubo un error');
			redirect('/');
		}
	};

	useEffect(() => {
		getProducts();
	}, [params.product]);

	console.log(product, '<= PRODUCTOS');

	const onAddToCart = async () => {
		const data = {
			id: product.id,
			colorCode: memorySelected,
			storageCode: colorSelected
		};
		const response = await fetch(
			'https://2gm2eu9uuw.us-east-1.awsapprunner.com/api/cart',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			}
		);
		const result = await response.json();
		console.log(result);
	};

	return (
		<section className={style.container}>
			<div className={style.container__image}>
				<img
					src={product.imgUrl}
					alt={product.model}
					className={style.container__image_img}
				/>
			</div>

			<div className={style.container__text}>
				<CardDescription product={product} />

				<div className={style.actions}>
					<Select prop={internalMemory} setMemorySelected={setMemorySelected} />

					<Select prop={colors} setMemorySelected={setMemorySelected} />
				</div>

				<button onClick={onAddToCart} className={style.container__text_btn}>
					Añadir al carrito
				</button>
			</div>
		</section>
	);
};

export default Product;
