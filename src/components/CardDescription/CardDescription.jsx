import style from './CardDescription.module.css';

const CardDescription = ({ product }) => {
	const {
		brand,
		model,
		cpu,
		ram,
		os,
		displayResolution,
		battery,
		primaryCamera,
		secondaryCmera,
		dimentions,
		weight
	} = product;

	return (
		<article className={style.article}>
			<h1 className={style.article__title}>{model}</h1>
			<p className={style.article__price}>{product.price} €</p>

			<h3 className={style.article__brand}>
				<span className={style.article__brandSpan}>Marca:</span> {brand}
			</h3>
			<h3 className={style.article__brand}>
				<span className={style.article__brandSpan}>Modelo:</span> {model}
			</h3>
			<h3 className={style.article__brand}>
				<span className={style.article__brandSpan}>CPU:</span> {cpu}
			</h3>
			<h3 className={style.article__brand}>
				<span className={style.article__brandSpan}>RAM:</span> {ram}
			</h3>
			<h3 className={style.article__brand}>
				<span className={style.article__brandSpan}>Sistema operativo:</span>{' '}
				{os}
			</h3>
			<h3 className={style.article__brand}>
				<span className={style.article__brandSpan}>
					Resolución de pantalla:
				</span>{' '}
				{displayResolution}
			</h3>
			<h3 className={style.article__brand}>
				<span className={style.article__brandSpan}>Bateria:</span> {battery}
			</h3>
			<h3 className={style.article__brand}>
				<span className={style.article__brandSpan}>Camara principal:</span>{' '}
				{primaryCamera}
			</h3>
			<h3 className={style.article__brand}>
				<span className={style.article__brandSpan}>Camara secundaria:</span>{' '}
				{secondaryCmera}
			</h3>
			<h3 className={style.article__brand}>
				<span className={style.article__brandSpan}>Dimensiones:</span>{' '}
				{dimentions}
			</h3>
			<h3 className={style.article__brand}>
				<span className={style.article__brandSpan}>Peso:</span> {weight}
			</h3>
		</article>
	);
};

export default CardDescription;
