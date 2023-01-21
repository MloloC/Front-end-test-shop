import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../contexts/ShopContext';
import style from './Breadcrumb.module.css';

const Breadcrumb = ({ url }) => {
	const { productTitle, setProductTitle } = useContext(ShopContext);

	return (
		<nav className={style.breadcrumb}>
			<Link
				to='/'
				className={style.bradcrumb__link}
				onClick={() => setProductTitle('')}
			>
				Home
			</Link>
			{productTitle ? <span className={style.bradcrumb__link}>|</span> : null}
			<Link to={url} className={style.bradcrumb__link}>
				{productTitle}
			</Link>
		</nav>
	);
};

export default Breadcrumb;
