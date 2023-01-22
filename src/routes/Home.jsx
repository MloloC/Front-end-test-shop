import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Search from '../components/Search/Search';
import { ShopContext } from '../contexts/ShopContext';
import style from './Home.module.css';

const Home = () => {
	const [products, setProducts] = useState([]);
	const [search, setSearch] = useState('');
	const { setLoading } = useContext(ShopContext);

	// UseEffect para llamar la función al cargar el componente
	useEffect(() => {
		const productsInStorage = localStorage.getItem('products');
		const expiration = localStorage.getItem('expiration');

		if (productsInStorage && expiration > Date.now()) {
			setProducts(JSON.parse(productsInStorage));
		} else {
			getProducts();
		}
	}, []);

	// Función para obtener los productos de la API
	const getProducts = async () => {
		setLoading(true);
		try {
			const response = await fetch(
				'https://2gm2eu9uuw.us-east-1.awsapprunner.com/api/product'
			);
			const data = await response.json();

			if (data && data.length > 0) {
				// Si se obtiene la información, actualizar el estado de products
				setProducts(data);
				// Almacena los productos en localstorage con una expiración de 1 hora
				localStorage.setItem('products', JSON.stringify(data));
				localStorage.setItem('expiration', Date.now() + 60 * 60 * 1000);
			} else {
				console.log('Hubo un error');
			}
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	};

	// Normalizar la búsqueda a minúsculas
	const normalizedSearch = search.toLowerCase();

	// Filtrar los productos según la búsqueda
	const productFiltered = search
		? products.filter(
				product =>
					product.brand.toLowerCase().startsWith(normalizedSearch) ||
					product.model.toLowerCase().startsWith(normalizedSearch)
		  )
		: products;

	return (
		<div className={style.container}>
			<section className={style.container__search}>
				<Search search={search} setSearch={setSearch} />
			</section>
			<section className={style.container__productList}>
				{productFiltered?.map(product => {
					return (
						<Link
							to={`/${product.id}`}
							key={product.id}
							className={style.container__productList_link}
						>
							<img
								src={product.imgUrl}
								alt={product.brand}
								className={style.container__productList_img}
							/>
							<article>
								<h2 className={style.container__productList_title}>
									{product.model} | {product.brand}
								</h2>
								<p className={style.container__productList_price}>
									{product.price} €
								</p>
							</article>
						</Link>
					);
				})}
			</section>
		</div>
	);
};

export default Home;
