import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShopContext } from '../../contexts/ShopContext';
import CartIcon from '../../img/svg/cartIcon';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import style from './Header.module.css';

const Header = () => {
	const { cartNumber, setProductTitle } = useContext(ShopContext);
	const location = useLocation();

	return (
		<nav className={style.header}>
			<Link
				to='/'
				className={style.header__link}
				onClick={() => setProductTitle('')}
			>
				LOGO
			</Link>
			<Breadcrumb url={location.pathname} />
			<div className={style.header__cartIcon}>
				<span className={style.header_cartIcon_number}>
					{cartNumber.length}
				</span>
				<CartIcon className={style.header__cartIcon_icon} />
			</div>
		</nav>
	);
};

export default Header;
