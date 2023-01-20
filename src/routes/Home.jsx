import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Search from '../components/Search/Search';
import style from './Home.module.css';

const Home = () => {
	const [products, setProducts] = useState([]);
	const [search, setSearch] = useState('');

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

	const normalizedSearch = search.toLowerCase();

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
