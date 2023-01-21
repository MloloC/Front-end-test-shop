import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CardDescription from '../components/CardDescription/CardDescription';
import Select from '../components/Select/Select';
import { ShopContext } from '../contexts/ShopContext';
import ArrowLeft from '../img/svg/ArrowLeft';
import style from './Product.module.css';

const Product = () => {
	const [product, setProduct] = useState({});
	const [memorySelected, setMemorySelected] = useState('');
	const [colorSelected, setColorSelected] = useState('');
	const { internalMemory, colors } = product;
	// Obteniendo el parámetro del producto de la URL
	const params = useParams();
	// Obteniendo el cartNumber y setCartNumber del ShopContext
	const { cartNumber, setCartNumber, setProductTitle } =
		useContext(ShopContext);

	// Función para obtener la información del producto de la API
	const getProduct = async () => {
		if (!params.product) return;

		try {
			// Realizar la llamada a la API
			const response = await fetch(
				`https://2gm2eu9uuw.us-east-1.awsapprunner.com/api/product/${params.product}`
			);
			// Procesar la respuesta en formato json
			const data = await response.json();

			// Si la llamada es exitosa, actualizar los estados del producto, memorySelected y colorSelected
			setProduct(data);
			setMemorySelected(data.internalMemory[0]);
			setColorSelected(data.colors[0]);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getProduct();
		setProductTitle(product.model);
	}, [params.product, product.model]);

	const onAddToCart = async () => {
		// Crear un objeto con los datos necesarios para agregar el producto al carrito
		const data = {
			id: product.id,
			colorCode: memorySelected,
			storageCode: colorSelected
		};
		try {
			// Realizar la llamada a la API para agregar el producto al carrito
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
			// Procesar la respuesta en formato json
			const result = await response.json();
			// Actualizar el número de artículos en el carrito
			setCartNumber([...cartNumber, parseInt(result.count)]);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<section className={style.container}>
			<div className={style.container__image}>
				<ArrowLeft
					className={style.container__image_arrowBack}
					onClick={() => window?.history?.back()}
				/>
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
