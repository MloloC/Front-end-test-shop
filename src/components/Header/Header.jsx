import { Link } from 'react-router-dom';
import CartIcon from '../../img/svg/cartIcon';
import style from './Header.module.css';

const Header = () => {
	return (
		<nav className={style.header}>
			<Link to='/' className={style.header__link}>
				LOGO
			</Link>
			<CartIcon className={style.header__cartIcon} />
		</nav>
	);
};

export default Header;
