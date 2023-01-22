import style from './Loader.module.css';

const Loader = ({ loading }) => {
	return (
		<>
			{loading ? (
				<div className={style.loader}>
					<svg viewBox='25 25 50 50'>
						<circle cx='50' cy='50' r='20'></circle>
					</svg>
					<h3>Cargando...</h3>
				</div>
			) : null}
		</>
	);
};

export default Loader;
