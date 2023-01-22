const Select = ({ prop, setValue }) => (
	<select onChange={e => setValue(e.target.value)}>
		{prop?.map((memory, index) => {
			return (
				<option key={memory + index} value={memory}>
					{memory}
				</option>
			);
		})}
	</select>
);

export default Select;
