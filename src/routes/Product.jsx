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
	const params = useParams();
	const { cartNumber, setCartNumber, setProductTitle, setLoading } =
		useContext(ShopContext);

	// UseEffect para obtener la información del producto y establecer el título del producto
	useEffect(() => {
		// Chequea si el producto esta en el localstorage y si aun no expiro
		const productInStorage = localStorage.getItem(`product-${params.product}`);
		const expiration = localStorage.getItem('expiration');
		// Si el producto esta en el storage y no ha expirado
		if (productInStorage && expiration > Date.now()) {
			// Obtiene la data del producto del storage
			const data = JSON.parse(productInStorage);
			// Establece el estado con la data
			setProduct(data);
			setMemorySelected(data.internalMemory[0]);
			setColorSelected(data.colors[0]);
		} else {
			// Si no esta en el storage o ya expiro, hace una nueva peticion
			getProduct();
		}
	}, [params.product]);

	const getProduct = async () => {
		if (!params.product) return;
		// Establece el loading como verdadero
		setLoading(true);
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
			// Almacena en el localstorage la data y su tiempo de expiracion
			localStorage.setItem('expiration', Date.now() + 60 * 60 * 1000);
			localStorage.setItem(`product-${params.product}`, JSON.stringify(data));
		} catch (error) {
			console.log(error);
		}
		setTimeout(() => {
			setLoading(false);
		}, 1000);
	};

	useEffect(() => {
		setProductTitle(product.model);
	}, [params.product, product.model]);

	const onAddToCart = async () => {
		// Crear un objeto con los datos necesarios para agregar el producto al carrito
		const data = {
			id: product.id,
			colorCode: colorSelected,
			storageCode: memorySelected
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

	const onGoBack = () => {
		setProductTitle('');
		if (window) window?.history?.back();
	};

	return (
		<section className={style.container}>
			<div className={style.container__image}>
				<ArrowLeft
					className={style.container__image_arrowBack}
					onClick={onGoBack}
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
					<Select prop={internalMemory} setValue={setMemorySelected} />

					<Select prop={colors} setValue={setColorSelected} />
				</div>

				<button onClick={onAddToCart} className={style.container__text_btn}>
					Añadir al carrito
				</button>
			</div>
		</section>
	);
};

export default Product;
