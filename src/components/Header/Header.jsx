import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import CartIcon from '../../img/svg/cartIcon';
import style from './Header.module.css';

const Header = () => {
	const { cartNumber } = useContext(CartContext);

	return (
		<nav className={style.header}>
			<Link to='/' className={style.header__link}>
				LOGO
			</Link>
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
