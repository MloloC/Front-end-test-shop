const Select = ({ prop, setMemorySelected }) => {
	return (
		<select onChange={e => setMemorySelected(e.target.value)}>
			{prop?.map((memory, index) => {
				return (
					<option key={memory + index} value={memory}>
						{memory}
					</option>
				);
			})}
		</select>
	);
};

export default Select;
