import { Link } from 'react-router-dom';
import style from './ProductListItem.module.css';

const ProductListItem = ({ products }) => {
	return (
		<>
			{products?.map(product => {
				return (
					<Link
						to={`/${product.id}`}
						key={product.id}
						className={style.productList_link}
					>
						<img
							src={product.imgUrl}
							alt={product.brand}
							className={style.productList_img}
						/>
						<article>
							<h2 className={style.productList_title}>
								{product.model} |{' '}
								<span className={style.productList_brand}>{product.brand}</span>
							</h2>
							<p className={style.productList_price}>
								{product.price ? product.price + '€' : 'N/A'}
							</p>
						</article>
					</Link>
				);
			})}
		</>
	);
};

export default ProductListItem;
