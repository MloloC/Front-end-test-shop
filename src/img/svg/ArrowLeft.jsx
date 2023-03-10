const ArrowLeft = ({ ...props }) => {
	return (
		<svg
			{...props}
			fill='none'
			viewBox='0 0 24 24'
			strokeWidth={1.5}
			stroke='currentColor'
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18'
			/>
		</svg>
	);
};

export default ArrowLeft;
