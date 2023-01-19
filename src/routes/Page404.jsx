import { Link } from 'react-router-dom';

const Page404 = () => {
	return (
		<div>
			<img src='./' alt='Error 404' />
			<Link to='/'>Volver a la home</Link>
		</div>
	);
};

export default Page404;
